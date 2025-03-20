<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../config/createDatabase.php'; // This ensures $conn is available

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["success" => false, "message" => "Missing id"]);
    exit;
}

$id = $conn->real_escape_string($data["id"]);

$sql = "DELETE FROM posts WHERE ID = $id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>