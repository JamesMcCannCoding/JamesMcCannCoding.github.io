<?php
    $dsn = 'mysql:host=localhost;dbname=id21419046_tech_support';
    $username = 'id21419046_james';
    $password = 'McCann1!';
    
    try {
        $db = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }    
?>