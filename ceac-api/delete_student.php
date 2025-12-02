<?php
// delete_student.php
require_once 'db_connect.php';

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing student ID']);
    exit();
}

$studentId = $data->id;

try {
    // Check if student exists and is actually a student (prevent deleting admins via this endpoint if needed)
    // For simplicity, we just delete by ID.
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ? AND role = 'student'");
    $stmt->execute([$studentId]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Student deleted successfully'
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Student not found or could not be deleted']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
