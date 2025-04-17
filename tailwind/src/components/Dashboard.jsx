import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login.');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
        setFormData({
          fullName: res.data.fullName,
          username: res.data.username,
          email: res.data.email,
        });
        setNotification('');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setNotification('Error fetching profile. Please check your token or API connection.');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();

    data.append('fullName', formData.fullName);
    data.append('username', formData.username);
    data.append('email', formData.email);
    if (profilePic) {
      data.append('profilePic', profilePic);
    }

    try {
      const res = await axios.put('http://localhost:3001/api/users/update', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(res.data.user);
      setNotification(res.data.message);
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setNotification(err.response?.data?.message || 'Profile update failed.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`,
              bottom: `-${Math.random() * 20}px`,
            }}
          ></div>
        ))}
      </div>

      <h1 className="text-4xl font-bold text-white mb-8 z-10">👤 User Dashboard</h1>
      {notification && <p className="mb-4 text-red-400 z-10">{notification}</p>}

      {profile ? (
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg text-white z-10 text-center">
          <div className="mb-6">
            <img
              src={profile.profilePic ? `http://localhost:3001/${profile.profilePic}` : 'https://via.placeholder.com/150x150.png?text=No+Image'}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow-lg object-cover"
            />
          </div>

          {editMode ? (
            <form onSubmit={handleUpdate} className="space-y-5 text-left">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-black/30 border border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-black/30 border border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-black/30 border border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Profile Picture</label>
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-white"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setNotification('');
                    setProfilePic(null);
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p><strong>Full Name:</strong> {profile.fullName}</p>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-white z-10">Loading profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
