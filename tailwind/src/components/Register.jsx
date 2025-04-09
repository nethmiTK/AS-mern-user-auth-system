import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
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
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error('Error registering:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6 transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-4xl font-semibold text-center text-gray-800">Create Account</h2>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="mt-2 w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="mt-2 w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="mt-2 w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="mt-2 w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Register
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-700">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
