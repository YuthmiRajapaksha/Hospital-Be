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



const pool = require("../config/db");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const {
    country,
    phone,
    email,
    title,
    firstName,
    lastName,
    idType,
    nicOrPassport,
    password,
  } = req.body;

  try {
    // Check duplicates by email or NIC/passport
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
      [email, nicOrPassport]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email or NIC/Passport already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user with hashed password and correct field names
    await pool.query(
      `INSERT INTO users 
       (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log("this is done")
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // Find user by email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // Compare password with hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login response (can add JWT token here if you want)
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { registerUser, loginUser };


