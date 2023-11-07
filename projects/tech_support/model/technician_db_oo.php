<?php
require_once('database_oo.php'); 
require_once('technician.php');

class TechnicianDB {

    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getDB();
    }

    public function getTechnicians() {
        $query = 'SELECT techID, firstName, lastName, email, phone, password FROM technicians';

        $statement = $this->db->prepare($query);
        $statement->execute();
        $results = $statement->fetchAll();
        $statement->closeCursor();
        
        $technicians = [];
        
        foreach ($results as $row) {
            $technician = new Technician($row['techID'], $row['firstName'], $row['lastName'], $row['email'], $row['phone'], $row['password']);

            $technicians[] = $technician;
        }        
        return $technicians;
    }

    public function delete_technician($technician_id) {
        echo "Deleting technician with ID: $technician_id";
        $query = "DELETE FROM technicians WHERE techID = :technician_id";
        
        $statement = $this->db->prepare($query);  // Note the change here
        $statement->bindValue(':technician_id', $technician_id);
        
        if ($statement->execute()) {
            $statement->closeCursor(); // Close the statement before returning
            return true; // Deletion successful
        } else {
            $statement->closeCursor(); // Close the statement before returning
            return false; // Deletion failed
        }
    }
    
    public function add_technician($firstName, $lastName, $email, $phone, $password) {
        $query = 'INSERT INTO technicians (firstName, lastName, email, phone, password) 
                  VALUES (:firstName, :lastName, :email, :phone, :password)';
        
        $statement = $this->db->prepare($query);
        $statement->bindValue(':firstName', $firstName);
        $statement->bindValue(':lastName', $lastName);
        $statement->bindValue(':email', $email);
        $statement->bindValue(':phone', $phone);
        $statement->bindValue(':password', $password);

        if ($statement->execute()) {
            $statement->closeCursor(); // Close the statement
            return true; // Insertion successful
        } else {
            $statement->closeCursor(); // Close the statement
            return false; // Insertion failed
        }
    }
}
    

?>