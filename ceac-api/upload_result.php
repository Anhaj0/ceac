<?php
// upload_result.php
require_once 'db_connect.php';

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// 1. Authentication Check (Simple Role Check)
$role = $_POST['role'] ?? '';

if ($role !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized: Only admins can upload results']);
    exit();
}

// Check if data is present
if (!isset($_POST['student_id']) || !isset($_POST['exam_type']) || !isset($_POST['title'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$student_id = $_POST['student_id'];
$exam_type = $_POST['exam_type'];
$title = $_POST['title'];
$exam_date = $_POST['exam_date'] ?? date('Y-m-d'); // Default to today if not set
$score = $_POST['score'] ?? null;

$new_filename = null;

// 2. File Validation (Only if file is uploaded)
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];

    // Check File Size (Limit to 5MB)
    $max_size = 5 * 1024 * 1024; // 5MB
    if ($file['size'] > $max_size) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large. Max size is 5MB.']);
        exit();
    }

    // Check MIME Type (Allow PDF and Images)
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime_type = $finfo->file($file['tmp_name']);

    $allowed_mimes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif'
    ];

    if (!in_array($mime_type, $allowed_mimes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only PDF and Images are allowed.']);
        exit();
    }

    // 3. Renaming (Security)
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $random_string = bin2hex(random_bytes(8)); // 16 chars
    $new_filename = 'result_' . $random_string . '.' . $extension;
    $upload_dir = __DIR__ . '/uploads/';
    $destination = $upload_dir . $new_filename;

    // Ensure uploads directory exists
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded file']);
        exit();
    }
} else {
    // No file uploaded, check if score is provided (at least one result indicator is needed)
    if (empty($score)) {
         // It's okay to have just a record without file or score? User said "if no pdf or image just typing the scrore"
         // implying score is the alternative. But maybe they want just a record.
         // Let's allow it but it's good practice to have something.
    }
}

// 4. Storage
try {
    $stmt = $pdo->prepare("INSERT INTO results (student_id, exam_type, title, file_path, exam_date, score) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$student_id, $exam_type, $title, $new_filename, $exam_date, $score]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Result added successfully',
        'file_path' => $new_filename
    ]);
} catch (PDOException $e) {
    // If DB insert fails and we uploaded a file, delete it
    if ($new_filename && file_exists($destination)) {
        unlink($destination);
    }
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
