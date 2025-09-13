import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListEmails() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setEmails(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch emails');
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>List of Emails</h1>
      <ul>
        {emails.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
