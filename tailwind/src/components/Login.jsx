import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', formData);
      alert(data.message); // Show success message
      localStorage.setItem('token', data.token); // Save token to localStorage
      navigate('/dashboard'); // Redirect to a dashboard or home page after successful login
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'Error logging in');
      } else {
        alert('Error logging in');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800">Login</h2>

        {['email', 'password'].map((field, idx) => (
          <div key={idx}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'password'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              required
              className="mt-2 w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-600 hover:text-purple-700">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
