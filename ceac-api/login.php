<?php
// login.php
require_once 'db_connect.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing username or password']);
    exit();
}

$username = trim($data->username);
$password = $data->password;

try {
    // Prepare statement to prevent SQL Injection
    $stmt = $pdo->prepare("SELECT id, username, password, role, full_name FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Password is correct
        // Remove password from the response
        unset($user['password']);
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Login failed']);
}
?>
