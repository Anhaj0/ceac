import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Calendar, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('daily');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userId = sessionStorage.getItem('user_id');
    const userName = sessionStorage.getItem('name');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost/ceac-api/get_results.php?student_id=${userId}`);
                // The API returns the array directly
                if (Array.isArray(response.data)) {
                    setResults(response.data);
                } else if (response.data.success && response.data.results) {
                    // Fallback
                    setResults(response.data.results);
                }
            } catch (err) {
                console.error('Error fetching results:', err);
                setError('Error connecting to server');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchResults();
        } else {
            navigate('/login');
        }
    }, [userId, navigate]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const filteredResults = results.filter(result => {
        if (activeTab === 'daily') return result.exam_type === 'Daily';
        if (activeTab === 'term') return result.exam_type === 'Term';
        if (activeTab === 'cambridge') return result.exam_type === 'Cambridge';
        return false;
    });

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors duration-200 ${activeTab === id
                ? 'bg-white text-[#002147] border-t-2 border-[#D4AF37]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
        >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Dashboard Header */}
            <div className="bg-[#002147] text-white py-8">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#D4AF37]">Student Dashboard</h1>
                        <p className="mt-2 text-gray-300 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Welcome, {userName}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-4">
                <div className="bg-white rounded-lg shadow-xl p-6">
                    {/* Tabs */}
                    <div className="flex space-x-2 border-b border-gray-200 mb-6 overflow-x-auto">
                        <TabButton id="daily" label="Daily Results" icon={FileText} />
                        <TabButton id="term" label="Term Tests" icon={FileText} />
                        <TabButton id="cambridge" label="Cambridge Exams" icon={FileText} />
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading results...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg">
                            {error}
                        </div>
                    ) : filteredResults.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                            <p>No results found for this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <FileText className="h-6 w-6 text-[#002147]" />
                                            </div>
                                            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100 text-gray-800">
                                                {result.exam_type}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                            {result.title}
                                        </h3>
                                        <div className="flex flex-col space-y-1 mb-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <span>Exam Date: {result.exam_date ? new Date(result.exam_date).toLocaleDateString() : 'N/A'}</span>
                                            </div>
                                            {result.score && (
                                                <div className="flex items-center text-sm font-semibold text-[#002147]">
                                                    <span className="mr-2">Score:</span>
                                                    <span>{result.score}</span>
                                                </div>
                                            )}
                                        </div>

                                        {result.file_path ? (
                                            <a
                                                href={`http://localhost/ceac-api/uploads/${result.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-full px-4 py-2 bg-[#002147] text-white rounded-md hover:bg-[#003366] transition-colors duration-200 group"
                                            >
                                                <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                                                Download Result
                                            </a>
                                        ) : (
                                            <div className="text-center text-sm text-gray-500 italic py-2 bg-gray-50 rounded">
                                                No file attached
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
