<?php
// reset_password.php
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
if ((!isset($data->username) && !isset($data->student_code)) || !isset($data->new_password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields (username/student_code and new_password)']);
    exit();
}

$new_password = $data->new_password;
$hashedPassword = password_hash($new_password, PASSWORD_DEFAULT);

try {
    if (isset($data->student_code) && !empty($data->student_code)) {
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE student_code = ? AND role = 'student'");
        $stmt->execute([$hashedPassword, $data->student_code]);
    } else {
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE username = ? AND role = 'student'");
        $stmt->execute([$hashedPassword, $data->username]);
    }

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Password reset successfully'
        ]);
    } else {
        // Could be that the user doesn't exist OR the password was already the same (less likely with hash)
        // But for security/UX we'll just say failed if no rows matched
        echo json_encode([
            'success' => false,
            'message' => 'User not found or password update failed'
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
