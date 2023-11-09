<!DOCTYPE html>
<html lang="en">
<head>
    <?php include './view/header.php'; ?>
    <meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="main.css" />
    <title>Sports Pro Technical Support</title>
</head>
<body>
    <main>
        <nav>
            <br>    
        <h2>Administrators</h2>
        <ul>
            <li><a href="product_manager">Manage Products</a></li>
            <li><a href="technician_manager">Manage Technicians</a></li>
            <li><a href="customer_manager">Manage Customers</a></li>
            <li><a href="create_incident">Create Incident</a></li>
            <li><a href="assign_incident">Assign Incident</a></li>
            <li><a href="display_incidents">Display Incidents</a></li>
        </ul>
            <br>
        <h2>Technicians</h2>
        <ul>
            <li><a href="under_construction.php">Update Incident</a></li>
        </ul>
            <br>
        <h2>Customers</h2>
        <ul>
            <li><a href="product_register">Register Product</a></li>
        </ul>
        </nav>
    </main>
    <?php include 'view/footer.php'; ?>
</body>
</html>