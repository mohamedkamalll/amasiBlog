<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../config/createDatabase.php'; // This ensures $conn is available
$posts = []; // Initialize empty array

if(count($posts) > 0){
     echo json_encode(["success" => true,"posts" => $posts]);
}else{
     $sql = "SELECT * FROM posts";
     $result = $conn->query($sql);
     if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
               $posts[] = $row; // Store each post as an object in array
          }
          echo json_encode(["success" => true,"posts" => $posts]);
     }else{
          echo json_encode(["success" => true,"posts" => $posts]);
     }
}


$conn->close();
?>