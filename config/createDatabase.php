<?php
     include 'db_connect.php'; // This ensures $conn is available


     // Check if database exists
     $db_check = $conn->query("SHOW DATABASES LIKE '$database'");

     if ($db_check->num_rows > 0) {
          echo "<script>console.log('Database already exists');</script>";
          $sql = "USE $database";
          $conn->query($sql);

     } else {
     // Create database if not exists
     $sql = "CREATE DATABASE $database";
     if ($conn->query($sql) === TRUE) {
          echo "Database '$database' created successfully.";
          include 'db_setup.php'; // This will run the table creation script
     } else {
          echo "Error creating database: " . $conn->error;
     }
     }
?>