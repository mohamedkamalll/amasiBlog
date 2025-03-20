<?php 
     include 'db_connect.php'; // This ensures $conn is available

     $sql = <<<EOT

     USE $database;

     CREATE TABLE posts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     EOT;

    if ($conn->multi_query($sql) === TRUE) {
        echo "table added successfully.";
    } else {
        echo "Error adding tables " . $conn->error;
    }

?>