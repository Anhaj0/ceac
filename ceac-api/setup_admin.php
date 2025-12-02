<?php
// setup_admin.php
require_once 'db_connect.php';

$username = 'admin';
$password = 'admin123';
$hash = password_hash($password, PASSWORD_BCRYPT);
$role = 'admin';
$full_name = 'System Administrator';

try {
    $stmt = $pdo->prepare("INSERT INTO users (username, password, role, full_name) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = ?, full_name = ?");
    $stmt->execute([$username, $hash, $role, $full_name, $hash, $full_name]);
    
    echo "Admin user setup successfully.<br>";
    echo "Username: $username<br>";
    echo "Password: $password<br>";
    echo "Hash: $hash<br>";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
