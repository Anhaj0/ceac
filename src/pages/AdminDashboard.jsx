import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Upload, Trash2, Plus, LogOut, UserPlus, FileUp, Search, User, X, FileText, KeyRound, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    // Search State
    const [searchQuery, setSearchQuery] = useState('');

    // Student Details Modal State
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentResults, setStudentResults] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);

    // Add Student Form State
    const [newStudent, setNewStudent] = useState({
        username: '',
        password: '',
        name: '',
        course: '',
        year: '',
        student_code: ''
    });

    // Upload Result Form State
    const [uploadData, setUploadData] = useState({
        student_id: '',
        type: 'Daily',
        title: '',
        file: null,
        exam_date: new Date().toISOString().split('T')[0],
        score: ''
    });

    // Password Reset State
    const [resetData, setResetData] = useState({
        identifier: '', // username or student_code
        new_password: ''
    });

    // Filtering State for Upload
    const [filterCourse, setFilterCourse] = useState('');
    const [filterYear, setFilterYear] = useState('');

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost/ceac-api/get_students.php');
            if (Array.isArray(response.data)) {
                setStudents(response.data);
            } else if (response.data.success && response.data.students) {
                setStudents(response.data.students);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Derive unique courses and years for filter dropdowns
    const uniqueCourses = [...new Set(students.map(s => s.course).filter(Boolean))];
    const uniqueYears = [...new Set(students.map(s => s.year).filter(Boolean))];

    // Filter students for the dropdown (Upload tab)
    const filteredStudentsForUpload = students.filter(student => {
        return (!filterCourse || student.course === filterCourse) &&
            (!filterYear || student.year === filterYear);
    });

    // Filter students for the list (Manage Students tab)
    const filteredStudentsList = students.filter(student => {
        const query = searchQuery.toLowerCase();
        return (
            student.full_name?.toLowerCase().includes(query) ||
            student.username?.toLowerCase().includes(query) ||
            student.student_code?.toLowerCase().includes(query) ||
            student.course?.toLowerCase().includes(query)
        );
    });

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const handleViewStudent = async (student) => {
        setSelectedStudent(student);
        setLoadingResults(true);
        try {
            const response = await axios.get(`http://localhost/ceac-api/get_results.php?student_id=${student.id}`);
            if (Array.isArray(response.data)) {
                setStudentResults(response.data);
            } else if (response.data.success && response.data.results) {
                setStudentResults(response.data.results);
            } else {
                setStudentResults([]);
            }
        } catch (error) {
            console.error('Error fetching student results:', error);
            setStudentResults([]);
        } finally {
            setLoadingResults(false);
        }
    };

    const closeStudentModal = () => {
        setSelectedStudent(null);
        setStudentResults([]);
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost/ceac-api/add_student.php', newStudent);
            if (response.data.success) {
                setMessage({ type: 'success', text: 'Student added successfully!' });
                setNewStudent({ username: '', password: '', name: '', course: '', year: '', student_code: '' });
                fetchStudents();
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Failed to add student' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error connecting to server' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;

        try {
            const response = await axios.post('http://localhost/ceac-api/delete_student.php', { id });
            if (response.data.success) {
                setMessage({ type: 'success', text: 'Student deleted successfully!' });
                fetchStudents();
            } else {
                setMessage({ type: 'error', text: 'Failed to delete student' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error connecting to server' });
        }
    };

    const handleUploadResult = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('role', 'admin');
        formData.append('student_id', uploadData.student_id);
        formData.append('exam_type', uploadData.type);
        formData.append('title', uploadData.title);
        formData.append('exam_date', uploadData.exam_date);
        formData.append('score', uploadData.score);
        if (uploadData.file) {
            formData.append('file', uploadData.file);
        }

        try {
            const response = await axios.post('http://localhost/ceac-api/upload_result.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                setMessage({ type: 'success', text: 'Result uploaded successfully!' });
                setUploadData({
                    ...uploadData,
                    title: '',
                    file: null,
                    score: '',
                    exam_date: new Date().toISOString().split('T')[0]
                });
                // Reset file input if it exists
                const fileInput = document.getElementById('file-upload');
                if (fileInput) fileInput.value = '';
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Failed to upload result' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error connecting to server' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Determine if input is username or student_code
            // Ideally backend handles this, we just send 'username' or 'student_code'
            // But our backend expects one or the other. Let's send both or let backend decide.
            // My reset_password.php checks for username OR student_code.
            // Let's assume the user enters either in the 'identifier' field.

            const payload = {
                new_password: resetData.new_password
            };

            // Simple heuristic or just send as username if it looks like one?
            // Actually, let's just send it as 'username' if it's not a code, or 'student_code' if it is.
            // Or better, update backend to accept 'identifier' and check both.
            // For now, based on my backend implementation:
            // if (isset($data->student_code)) ... else ...

            // Let's try to send as student_code first if it matches a pattern, or just send both?
            // I'll update the payload to send 'username' as the identifier, and let backend check.
            // Wait, my backend checks: if (isset($data->student_code)) ... else ...
            // So I should send one or the other.

            // Let's just send it as 'username' for now, and if that fails, maybe the user meant student code?
            // Actually, the prompt said "enter the username or ID".
            // Let's send it as 'username' property, but the value can be ID.
            // *Correction*: My backend logic in reset_password.php was:
            // if (isset($data->student_code)) ... else ...
            // So I need to know which one it is.
            // Let's just send BOTH as the same value, or change backend.
            // Since I can't change backend easily right now without another tool call,
            // I will send it as 'username' and 'student_code' (same value) and let the backend logic (which checks student_code first) handle it?
            // Wait, if I send both, backend checks student_code first. If I enter a username "john", and send it as student_code="john", it will try to update where student_code="john".
            // If "john" is a username, it won't find it.

            // I'll just add a radio button or dropdown to select "Search by: Username / Student ID" to be safe.
            // OR I can just send it as 'username' and update the backend to check both columns for that value.
            // But I'll stick to the UI solution: A simple selector.

            if (resetData.type === 'id') {
                payload.student_code = resetData.identifier;
            } else {
                payload.username = resetData.identifier;
            }

            const response = await axios.post('http://localhost/ceac-api/reset_password.php', payload);
            if (response.data.success) {
                setMessage({ type: 'success', text: 'Password reset successfully!' });
                setResetData({ identifier: '', new_password: '', type: 'username' });
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Failed to reset password' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error connecting to server' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-[#002147] text-white py-6 sticky top-0 z-30 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#D4AF37]">Admin Dashboard</h1>
                        <p className="text-xs md:text-sm text-gray-300">Manage students and results</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors duration-200 text-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </div>

            {/* Student Details Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#002147] text-white">
                            <h3 className="text-xl font-bold flex items-center">
                                <User className="h-5 w-5 mr-2" />
                                {selectedStudent.full_name}
                            </h3>
                            <button
                                onClick={closeStudentModal}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto">
                            {/* Student Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div>
                                    <p className="text-sm text-gray-500">Student ID (Academy)</p>
                                    <p className="font-medium text-gray-900">{selectedStudent.student_code || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Username</p>
                                    <p className="font-medium text-gray-900">@{selectedStudent.username}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Course</p>
                                    <p className="font-medium text-gray-900">{selectedStudent.course || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Year/Batch</p>
                                    <p className="font-medium text-gray-900">{selectedStudent.year || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Results History Table */}
                            <h4 className="text-lg font-bold text-[#002147] mb-4 flex items-center">
                                <FileText className="h-5 w-5 mr-2" />
                                Academic History
                            </h4>

                            {loadingResults ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002147]"></div>
                                </div>
                            ) : studentResults.length > 0 ? (
                                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {studentResults.map((result) => (
                                                <tr key={result.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${result.exam_type === 'Term' ? 'bg-purple-100 text-purple-800' :
                                                            result.exam_type === 'Cambridge' ? 'bg-orange-100 text-orange-800' :
                                                                'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {result.exam_type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {result.exam_date ? new Date(result.exam_date).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                                                        {result.score || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {result.file_path ? (
                                                            <a
                                                                href={`http://localhost/ceac-api/uploads/${result.file_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-900 hover:underline"
                                                            >
                                                                View
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">No File</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    <p>No results found for this student.</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                            <button
                                onClick={closeStudentModal}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 mt-6">
                <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
                    {/* Tabs */}
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 border-b border-gray-200 mb-6 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors duration-200 whitespace-nowrap ${activeTab === 'students'
                                ? 'border-[#D4AF37] text-[#002147]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Users className="h-5 w-5" />
                            <span>Manage Students</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors duration-200 whitespace-nowrap ${activeTab === 'upload'
                                ? 'border-[#D4AF37] text-[#002147]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Upload className="h-5 w-5" />
                            <span>Upload Results</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors duration-200 whitespace-nowrap ${activeTab === 'password'
                                ? 'border-[#D4AF37] text-[#002147]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <KeyRound className="h-5 w-5" />
                            <span>Forgot Password</span>
                        </button>
                    </div>

                    {/* Message Alert */}
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Content */}
                    {activeTab === 'students' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Add Student Form */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
                                    <h3 className="text-lg font-bold text-[#002147] mb-4 flex items-center">
                                        <UserPlus className="h-5 w-5 mr-2" />
                                        Add New Student
                                    </h3>
                                    <form onSubmit={handleAddStudent} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={newStudent.name}
                                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID (Academy Code)</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. STU001"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={newStudent.student_code}
                                                onChange={(e) => setNewStudent({ ...newStudent, student_code: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. English Diploma"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={newStudent.course}
                                                onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Year/Batch</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 2024"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={newStudent.year}
                                                onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={newStudent.username}
                                                onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                            <input
                                                type="password"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={newStudent.password}
                                                onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#002147] text-white py-2 px-4 rounded-md hover:bg-[#003366] transition-colors duration-200 flex justify-center items-center"
                                        >
                                            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Add Student'}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Student List */}
                            <div className="lg:col-span-2">
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                                        <div>
                                            <h3 className="text-lg font-bold text-[#002147]">Existing Students</h3>
                                            <span className="text-sm text-gray-500">{filteredStudentsList.length} Students</span>
                                        </div>
                                        <div className="relative w-full sm:w-64">
                                            <input
                                                type="text"
                                                placeholder="Search by Name, ID, Course..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4AF37] text-sm"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                        {filteredStudentsList.map((student) => (
                                            <div
                                                key={student.id}
                                                className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors group"
                                                onClick={() => handleViewStudent(student)}
                                            >
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <p className="font-medium text-gray-900 group-hover:text-[#002147] transition-colors">{student.full_name}</p>
                                                        {student.student_code && (
                                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                                                {student.student_code}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">@{student.username}</p>
                                                    {student.course && <p className="text-xs text-gray-400">{student.course} - {student.year}</p>}
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteStudent(student.id);
                                                    }}
                                                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                    title="Delete Student"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                        {filteredStudentsList.length === 0 && (
                                            <div className="px-6 py-8 text-center text-gray-500">
                                                No students found matching your search.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'upload' ? (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#002147] mb-6 flex items-center">
                                    <FileUp className="h-6 w-6 mr-2" />
                                    Upload Result
                                </h3>
                                <form onSubmit={handleUploadResult} className="space-y-6">

                                    {/* Filters */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Course</label>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={filterCourse}
                                                onChange={(e) => setFilterCourse(e.target.value)}
                                            >
                                                <option value="">All Courses</option>
                                                {uniqueCourses.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Year</label>
                                            <select
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={filterYear}
                                                onChange={(e) => setFilterYear(e.target.value)}
                                            >
                                                <option value="">All Years</option>
                                                {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
                                        <div className="relative">
                                            <select
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37] appearance-none"
                                                value={uploadData.student_id}
                                                onChange={(e) => setUploadData({ ...uploadData, student_id: e.target.value })}
                                            >
                                                <option value="">Select a student...</option>
                                                {filteredStudentsForUpload.map((student) => (
                                                    <option key={student.id} value={student.id}>
                                                        {student.full_name} ({student.student_code ? student.student_code : `@${student.username}`})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                                        <div className="flex space-x-4">
                                            {['Daily', 'Term', 'Cambridge'].map((type) => (
                                                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="examType"
                                                        value={type}
                                                        checked={uploadData.type === type}
                                                        onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
                                                        className="text-[#002147] focus:ring-[#D4AF37]"
                                                    />
                                                    <span>{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={uploadData.exam_date}
                                                onChange={(e) => setUploadData({ ...uploadData, exam_date: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Score/Grade (Optional)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 85, A, Pass"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                                value={uploadData.score}
                                                onChange={(e) => setUploadData({ ...uploadData, score: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Result Title</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g., Mathematics Term 1 Test"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                            value={uploadData.title}
                                            onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Result File (PDF/Image) - Optional</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#D4AF37] transition-colors duration-200 bg-white">
                                            <div className="space-y-1 text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#002147] hover:text-[#003366] focus-within:outline-none"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })}
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PDF, PNG, JPG up to 10MB
                                                </p>
                                                {uploadData.file && (
                                                    <p className="text-sm text-green-600 font-medium mt-2">
                                                        Selected: {uploadData.file.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#002147] text-white py-3 px-4 rounded-md hover:bg-[#003366] transition-colors duration-200 flex justify-center items-center font-medium shadow-md"
                                    >
                                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Upload Result'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto">
                            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-[#002147] mb-6 flex items-center">
                                    <KeyRound className="h-6 w-6 mr-2" />
                                    Reset Student Password
                                </h3>
                                <form onSubmit={handleResetPassword} className="space-y-6">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Student By</label>
                                        <div className="flex space-x-4 mb-4">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="resetType"
                                                    value="username"
                                                    checked={resetData.type !== 'id'}
                                                    onChange={() => setResetData({ ...resetData, type: 'username' })}
                                                    className="text-[#002147] focus:ring-[#D4AF37]"
                                                />
                                                <span>Username</span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="resetType"
                                                    value="id"
                                                    checked={resetData.type === 'id'}
                                                    onChange={() => setResetData({ ...resetData, type: 'id' })}
                                                    className="text-[#002147] focus:ring-[#D4AF37]"
                                                />
                                                <span>Student ID</span>
                                            </label>
                                        </div>

                                        <input
                                            type="text"
                                            required
                                            placeholder={resetData.type === 'id' ? "Enter Student ID (e.g. STU001)" : "Enter Username"}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                            value={resetData.identifier}
                                            onChange={(e) => setResetData({ ...resetData, identifier: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input
                                            type="password"
                                            required
                                            placeholder="Enter new password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                            value={resetData.new_password}
                                            onChange={(e) => setResetData({ ...resetData, new_password: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#002147] text-white py-3 px-4 rounded-md hover:bg-[#003366] transition-colors duration-200 flex justify-center items-center font-medium shadow-md"
                                    >
                                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Reset Password'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
