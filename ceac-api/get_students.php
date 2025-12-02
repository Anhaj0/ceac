<?php
// get_students.php
require_once 'db_connect.php';

try {
    // Fetch only students, not admins
    $sql = "SELECT id, username, full_name, course, year, student_code FROM users WHERE role = 'student'";
    $params = [];

    if (isset($_GET['course']) && !empty($_GET['course'])) {
        $sql .= " AND course = ?";
        $params[] = $_GET['course'];
    }

    if (isset($_GET['year']) && !empty($_GET['year'])) {
        $sql .= " AND year = ?";
        $params[] = $_GET['year'];
    }

    $sql .= " ORDER BY full_name ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $students = $stmt->fetchAll();

    echo json_encode($students);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch students']);
}
?>
