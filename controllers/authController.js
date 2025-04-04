// const db = require("../db");

// const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }

//   const sql = "SELECT * FROM doctors WHERE userName = ? AND password = ?";
//   db.query(sql, [username, password], (err, results) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
    
//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     const user = results[0];
//     const role = "user"; // All doctors are users

//     return res.json({ message: "Login successful", role });
//   });
// };

// module.exports = { loginUser };



// routes/auth.js
// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // Your db connection

// // Login route for doctors
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

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

