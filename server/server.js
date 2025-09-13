const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // عدل هذا حسب عنوان الواجهة
}));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'userdb',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// تسجيل مستخدم جديد
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'User registered successfully!' });
  });
});

// تسجيل دخول (مقارنة كلمة المرور مباشرة)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    });
  });
});

// صفحة بروفايل (ثابتة فقط كمثال)
app.get('/api/profile', (req, res) => {
  res.status(200).json({
    user: {
      id: 1,
      username: 'demo_user',
      email: 'demo@example.com'
    }
  });
});
// تحديث كلمة السر
app.put('/api/update-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  const sql = 'UPDATE users SET password = ? WHERE email = ?';
  db.query(sql, [newPassword, email], (err, result) => {
    if (err) {
      console.error('Error updating password:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  });
});
app.put('/api/update-email', (req, res) => {
  const { oldEmail, newEmail } = req.body;

  if (!oldEmail || !newEmail) {
    return res.status(400).json({ message: 'Both old and new emails are required' });
  }

  const sql = 'UPDATE users SET email = ? WHERE email = ?';
  db.query(sql, [newEmail, oldEmail], (err, result) => {
    if (err) {
      console.error('Error updating email:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Email updated successfully' });
  });
});

app.get('/api/users', (req, res) => {
  const sql = 'SELECT email FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching emails:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results); // قائمة إيميلات
  });
});
app.delete('/api/delete-user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const sql = 'DELETE FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
