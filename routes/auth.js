// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the db connection

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials
  if (username === 'admin' && password === '1234') {
    return res.json({ success: true, role: 'admin', message: 'Admin login successful!' });
  }

  

  const query = 'SELECT * FROM doctors WHERE userName = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database error during login:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const doctor = results[0];
    res.json({ message: 'Login successful', role: 'user', doctor });
  });
});

module.exports = router;
