import React, { useState } from 'react';
import axios from 'axios';

export default function UpdateEmail() {
  const [formData, setFormData] = useState({
    oldEmail: '',
    newEmail: '',
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
      const res = await axios.put('http://localhost:5000/api/update-email', formData);
      alert(res.data.message);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Update Email</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="oldEmail" 
          placeholder="Old Email" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="newEmail" 
          placeholder="New Email" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Update Email</button>
      </form>
    </div>
  );
}
