<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../config/createDatabase.php'; // This ensures $conn is available

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["title"]) || !isset($data["content"]) ) {
    echo json_encode(["success" => false, "message" => "Missing title or content"]);
    exit;
}

$id = $conn->real_escape_string($data["id"]);
$title = $conn->real_escape_string($data["title"]);
$content = $conn->real_escape_string($data["content"]);

$sql = "UPDATE posts SET title = '$title', content = '$content' WHERE id = $id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>