<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="../main.css"/>
    <title>Sports Pro - Manage Technicians</title>
</head>
<body>
    <main>
        <?php
        require('../model/database.php');
        require('../model/technician_db.php');

        $action = filter_input(INPUT_POST, 'action');
        if ($action === NULL) {
            $action = filter_input(INPUT_GET, 'action');
            if ($action === NULL) {
                $action = 'list_technicians';   // Default action when page is loaded.
            }
        }
        // List Technicians:
        if ($action == 'list_technicians') {
            // Get technician data
            $technicians = get_technicians();
            // Display technician list
            include('technician_list.php');

        // Delete technician:    
} else if ($action == 'delete_technician') {
    $technician_id = filter_input(INPUT_POST, 'technician_id');
    // Ensure $technician_id is not empty and contains a valid product code
    if (!empty($technician_id)) {
        // Call the delete_technician function
        if (delete_technician($technician_id)) {
            // Deletion was successful, fetch the updated list of technicians
            $technicians = get_technicians();
            // Include the technician list page
            include('technician_list.php');
        }
    }

        // Shows the technician add form.
        } else if ($action == 'show_add_form') {
            include('technician_add.php'); // Load the form for adding a technician
        // Technician add validation
        } else if ($action == 'add_technician') {
            // Get data from the form
            $first_name = filter_input(INPUT_POST, 'firstName');
            $last_name = filter_input(INPUT_POST, 'lastName');
            $email = filter_input(INPUT_POST, 'email');
            $phone = filter_input(INPUT_POST, 'phone');
            $password = filter_input(INPUT_POST, 'password');

            // Create a new array to store error messages
            $errors = array();

            // Validate First Name
            if (empty($first_name)) {
                $errors['firstName'] = 'First Name is required.';
            }

            // Validate Last Name
            if (empty($last_name)) {
                $errors['lastName'] = 'Last Name is required.';
            }

            // Validate Email
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = 'Email address is not valid.';
            }

            if(email_exists($email)) {
                // Handle the duplicate email case
                $errorMessage = "The email address is already in use. Please use a different email.";
                include('technician_error.php');
            } 
            
            // Validate Phone
            if (empty($phone)) {
                $errors['phone'] = 'Phone is required.';
            }

            // Validate Password
            if (empty($password)) {
                $errors['password'] = 'Password is required.';
            }

            // If there are validation errors, include the error_page.php file
            if (!empty($errors)) {
                include('technician_error.php');
            } else {
                // All validation passed, proceed with adding the technician
                $addSuccess = add_technician($first_name, $last_name, $email, $phone, $password);

                if ($addSuccess) {
                    // Include the success page content
                    include('technician_success.php');
                } else {
                    // Handle the case where the addition fails
                    $errorMessage = "Failed to add the technician.";
                    include('technician_error.php');
                }
            }
        }
        ?>
    </main>
</body>
</html>