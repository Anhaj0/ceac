<?php
// add_student.php
require_once 'db_connect.php';

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

// Check if data is valid
if (!isset($data->username) || !isset($data->password) || !isset($data->name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// TODO: In a real app, you should verify the requester is an admin.
// For now, we assume the frontend handles the protection or we check a session/token if implemented.
// Since we don't have a session mechanism in the provided files, we'll skip strict server-side auth for this demo
// BUT we should at least check if the user exists to avoid duplicates.

$username = trim($data->username);
$password = $data->password;
$fullName = trim($data->name);
$course = isset($data->course) ? trim($data->course) : null;
$year = isset($data->year) ? trim($data->year) : null;
$student_code = isset($data->student_code) ? trim($data->student_code) : null;

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO users (username, password, role, full_name, course, year, student_code) VALUES (?, ?, 'student', ?, ?, ?, ?)");
    $stmt->execute([$username, $hashedPassword, $fullName, $course, $year, $student_code]);

    echo json_encode([
        'success' => true,
        'message' => 'Student added successfully'
    ]);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // Duplicate entry
        http_response_code(409);
        echo json_encode(['error' => 'Username already exists']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
