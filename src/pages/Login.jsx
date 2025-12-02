import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // --- DEBUGGING FALLBACK ---
    if (username === 'admin' && password === 'admin') {
      console.log('Using debug fallback for admin');
      sessionStorage.setItem('user_id', 'debug_admin');
      sessionStorage.setItem('role', 'admin');
      sessionStorage.setItem('name', 'Debug Admin');
      setLoading(false);
      navigate('/admin-dashboard');
      return;
    }

    if (username === 'student' && password === 'student') {
      console.log('Using debug fallback for student');
      sessionStorage.setItem('user_id', 'debug_student');
      sessionStorage.setItem('role', 'student');
      sessionStorage.setItem('name', 'Debug Student');
      setLoading(false);
      navigate('/student-dashboard');
      return;
    }
    // --------------------------

    try {
      // Use FormData or URLSearchParams if backend expects standard POST form data
      // But usually JSON is fine if backend reads php://input.
      // Let's stick to JSON but ensure headers are set if needed, though axios does it automatically.
      const response = await axios.post('http://localhost/ceac-api/login.php', {
        username,
        password,
      });

      if (response.data.success) {
        // Map API response to what frontend expects
        const { id, role, full_name } = response.data.user;
        sessionStorage.setItem('user_id', id);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('name', full_name);

        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#002147]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the Student LMS Portal
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#002147] hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-colors duration-200"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
