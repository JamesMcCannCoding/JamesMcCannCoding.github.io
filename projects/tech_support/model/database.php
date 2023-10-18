<?php
    //$dsn = 'mysql:host=localhost;dbname=tech_support';
    $server = 'sql110.infinityfree.com';
    $username = 'if0_35254941';
    $password = 'xovIthbe0U6J';
    $dbname = 'if0_35254941_SportPro';

    try {
        $db = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }
?>