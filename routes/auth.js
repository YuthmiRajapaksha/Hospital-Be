// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db'); // Import the db connection

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Hardcoded admin credentials
//   if (username === 'admin' && password === '1234') {
//     return res.json({ success: true, role: 'admin', message: 'Admin login successful!' });
//   }

  

//   const query = 'SELECT * FROM doctors WHERE userName = ? AND password = ?';
//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//       console.error('Database error during login:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const doctor = results[0];
//     res.json({ message: 'Login successful', role: 'user', doctor });
//   });
// });

// module.exports = router;



// routes/auth.js
// routes/auth.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // mysql2 promise-based pool

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 1. Check required fields
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // 2. Admin login (hardcoded)
  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      role: "admin",
      message: "Admin login successful!",
    });
  }

  try {
    // 3. Doctor login from DB (doctors table)
    const sql = "SELECT * FROM doctors WHERE userName = ? AND password = ?";
    const [rows] = await pool.query(sql, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const doctor = rows[0];

    return res.json({
      success: true,
      role: "user", // doctor role
      message: "Doctor login successful",
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        contactNumber: doctor.contactNumber,
        username: doctor.userName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
