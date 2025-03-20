<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../config/createDatabase.php'; // This ensures $conn is available

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["title"]) || !isset($data["content"])) {
    echo json_encode(["success" => false, "message" => "Missing title or content"]);
    exit;
}

$title = $conn->real_escape_string($data["title"]);
$content = $conn->real_escape_string($data["content"]);

$sql = "INSERT INTO posts (title, content) VALUES ('$title', '$content')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "id" => $conn->insert_id , "created_at" => date("Y-m-d H:i:s")]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>