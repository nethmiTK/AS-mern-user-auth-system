import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="emailOrUsername"
        placeholder="Email or Username"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
