import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);
      alert(res.data.message);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/profile');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
