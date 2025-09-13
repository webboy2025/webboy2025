import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.username}!</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.id}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
