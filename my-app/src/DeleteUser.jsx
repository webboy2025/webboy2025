import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteUser() {
  const [email, setEmail] = useState('');

  const handleDelete = async () => {
    if (!email) {
      alert('Please enter an email');
      return;
    }

    try {
      const res = await axios.delete('http://localhost:5000/api/delete-user', { data: { email } });
      alert(res.data.message);
      setEmail('');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Delete User</h1>
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
