
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Route: POST /api/register
router.post('/register', async (req, res) => {
  const {
    country,
    phone,
    email,
    title,
    firstName,
    lastName,
    idType,
    nic,
    password
  } = req.body;

  console.log("Registering user with:", req.body);

  try {
    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users 
        (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      country,
      phone,
      email,
      title,
      firstName,
      lastName,
      idType,
      nic,
      hashedPassword
    ];

    console.log("Executing query with values:", values);

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error registering user:', err.sqlMessage || err.message || err);

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email or NIC/Passport already exists' });
        }

        return res.status(500).json({ message: 'Registration failed', error: err.sqlMessage });
      }

      res.status(200).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

module.exports = router;
