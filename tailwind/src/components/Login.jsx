import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', formData);
      alert(data.message);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'Error logging in');
      } else {
        alert('Error logging in');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6 transform hover:scale-105 transition duration-500"
      >
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg animate-fade-in-down">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-purple-200 animate-fade-in-up">Sign in to continue</p>

        {['email', 'password'].map((field, idx) => (
          <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-purple-200 capitalize mb-1"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'password'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              required
              className="mt-2 w-full p-4 bg-white/20 text-white placeholder-purple-300 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/30 transition duration-300"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-purple-200">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-400 hover:text-purple-500 underline">
            Register here
          </a>
        </p>
      </form>

      <style>
        {`
          @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.6s ease forwards;
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
