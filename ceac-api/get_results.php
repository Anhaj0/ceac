<?php
// get_results.php
require_once 'db_connect.php';

if (!isset($_GET['student_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing student_id']);
    exit();
}

$student_id = $_GET['student_id'];

try {
    $stmt = $pdo->prepare("SELECT id, exam_type, title, file_path, uploaded_at, exam_date, score FROM results WHERE student_id = ? ORDER BY exam_date DESC, uploaded_at DESC");
    $stmt->execute([$student_id]);
    $results = $stmt->fetchAll();

    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch results']);
}
?>
