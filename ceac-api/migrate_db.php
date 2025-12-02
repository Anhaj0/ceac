<?php
require_once 'db_connect.php';

try {
    // Add columns to users table
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS course VARCHAR(100)");
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS year VARCHAR(20)");
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS student_code VARCHAR(50) AFTER full_name");

    // Add columns to results table
    $pdo->exec("ALTER TABLE results ADD COLUMN IF NOT EXISTS exam_date DATE");
    $pdo->exec("ALTER TABLE results ADD COLUMN IF NOT EXISTS score VARCHAR(50)");
    
    // Modify file_path to be nullable
    $pdo->exec("ALTER TABLE results MODIFY file_path VARCHAR(255) NULL");

    echo "Database schema updated successfully.";
} catch (PDOException $e) {
    echo "Error updating database: " . $e->getMessage();
}
?>
