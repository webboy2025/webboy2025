import React, { useState } from 'react';
import axios from 'axios';

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/update-password', formData);
      alert(res.data.message);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
