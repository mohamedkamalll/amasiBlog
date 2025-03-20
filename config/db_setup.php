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
        $message = "table added successfully.";
        header("X-Debug-Message: $message");
    } else {
        $message = "Error adding tables " . $conn->error;
        header("X-Debug-Message: $message");
    }
    $conn->close();
    $conn = new mysqli($host, $user, $password, $database);  // Reconnect the database to ensure when selecting posts it willnt show an error cause its not updated yet

?>