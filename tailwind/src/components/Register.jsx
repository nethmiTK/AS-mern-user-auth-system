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

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData); // Log form data for debugging
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/register', formData);
      alert(data.message); // Show success message
      navigate('/'); // Redirect to home or login page after successful registration
    } catch (err) {
      // Handle errors from the backend
      if (err.response) {
        alert(err.response.data.message || 'Error registering user');
      } else {
        alert('Error registering user');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800">Create Account</h2>

        {['fullName', 'username', 'email', 'password'].map((field, idx) => (
          <div key={idx}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
              {field === 'fullName' ? 'Full Name' : field}
            </label>
            <input
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
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
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:text-purple-700">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
