import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
  });
  const [notification, setNotification] = useState('');
  const token = localStorage.getItem('token');

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
        setFormData(data);
        setNotification('');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setNotification('Error fetching profile. Please check your token or API connection.');
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setNotification('No token found. Please login again.');
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('http://localhost:3001/api/auth/update', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification(data.message || 'Profile updated successfully.');
      setProfile(data.user);
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setNotification(err.response?.data?.message || 'Profile update failed.');
    }
  };

  if (notification && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>{notification}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.fullName}`}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-purple-600"
          />
          <h2 className="mt-4 text-2xl font-bold">{profile.fullName}</h2>
          <p className="text-gray-500">@{profile.username}</p>
        </div>

        {notification && (
          <div className="mb-4 text-center text-red-600">
            {notification}
          </div>
        )}

        {editMode ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => { setEditMode(false); setNotification(''); }}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <button
              onClick={() => { setEditMode(true); setNotification(''); }}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
