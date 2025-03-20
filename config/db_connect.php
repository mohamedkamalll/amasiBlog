<?php
$host = "localhost";
$user = "root";  
$password = "";  
$database = "BlogDB";

// Connect to MySQL
$conn = new mysqli($host, $user, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>