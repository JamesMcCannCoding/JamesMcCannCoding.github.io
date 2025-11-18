<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="../main.css" />
    <title>Sports Pro - Manage Products</title>
</head>
<body>
    <main>
        <?php
        require('../model/database.php');
        require('../model/customer_db.php');

        $action = filter_input(INPUT_POST, 'action');
        if ($action === NULL) {
            $action = filter_input(INPUT_GET, 'action');
            if ($action === NULL) {
                $action = 'list_customers'; // Default action to list all customers
            }
        }

        // Instantiate variables
        $last_name = '';
        $customers = array();

        // Search for customers.
        if ($action == 'search_customers') {
            // Check if the form has been submitted
            $last_name = filter_input(INPUT_POST, 'last_name');
            
            if ($last_name !== null) {
                // Search for customers by last name
                $customers = get_customers_by_last_name($last_name);
        
                if (!empty($customers)) {
                    // Display the search results
                    include('customer_search.php');
                } else {
                    $error = "No customers found.";
                    include('customer_search.php');
                }
            } else {
                // Display the search form
                include('customer_search.php');
            }
        
        // List all customers in the table on list customers page.
        } else if ($action == 'list_customers') {
            $customers = get_customers(); // Fetch all customers
            include('customer_list.php');

        // Display the customer after the search has found them.
        } else if ($action == 'display_customer') {
            $last_name = filter_input(INPUT_GET, 'last_name');
            if ($last_name !== false) {
                $customers_found = get_customers_by_last_name($last_name);
                if ($customers_found) {
                    global $selected_customer;
                    $customer = $selected_customer; 
                    // Customers found, display the list
                    include('customer_display.php');
                } else {
                    // No customers found, display an error
                    $error = "Customer not found.";
                    include('customer_search.php');
                }
            } else {
                $error = "Invalid customer ID.";
                include('customer_search.php');
            }

        // Post customer data to update their information.
        } if ($action == 'update_customer') {
            // Retrieve data from the form.
            $customer_id = filter_input(INPUT_POST, 'customer_id',);
            $first_name = filter_input(INPUT_POST, 'first_name');
            $last_name = filter_input(INPUT_POST, 'last_name');
            $address = filter_input(INPUT_POST, 'address');
            $city = filter_input(INPUT_POST, 'city');
            $state = filter_input(INPUT_POST, 'state');
            $postal_code = filter_input(INPUT_POST, 'postal_code');
            $country_code = filter_input(INPUT_POST, 'country_code');
            $phone = filter_input(INPUT_POST, 'phone');
            $email = filter_input(INPUT_POST, 'email');
            $password = filter_input(INPUT_POST, 'password');

            // Validate input
            $errors = array();

            if (empty($first_name)) {
                $errors[] = 'First Name is required.';
            }

            if (empty($last_name)) {
                $errors[] = 'Last Name is required.';
            }

            if (empty($address)) {
                $errors[] = 'Address is required.';
            }

            if (empty($city)) {
                $errors[] = 'City is required.';
            }

            if (empty($state)) {
                $errors[] = 'State is required.';
            }

            if (empty($postal_code)) {
                $errors[] = 'Postal Code is required.';
            }

            if (empty($country_code)) {
                $errors[] = 'Country is required.';
            }

            if (empty($phone)) {
                $errors[] = 'Phone is required.';
            }

            if (empty($email)) {
                $errors[] = 'Email is required.';
            }

            if (empty($password)) {
                $errors[] = 'Password is required.';
            }

            // If there are validation errors, display them and do not update the database
            if (!empty($errors)) {
                include('customer_errors.php');
            } else {
                // No validation errors, proceed with updating the database
                $addSuccess = update_customer($customer_id, $first_name, $last_name, $address, $city, $state, $postal_code, $country_code, $phone, $email, $password);

                if ($addSuccess) {
                    // Redirect to the technician list page with a success message
                    include('customer_success.php');
                } else {
                    // Handle the case where the addition fails
                    $errorMessage = "Failed to add the technician.";
                    include('customer_errors.php');
                }
            }
        }
        ?>
        </main>
    </body>
</html>