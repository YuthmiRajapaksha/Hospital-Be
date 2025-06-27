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
// // routes/auth.js
// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db"); // mysql2 promise-based pool
// const bcrypt = require("bcrypt");
// const authenticateToken = require('../middleware/authenticateToken');
// require('dotenv').config();

// // POST /api/auth/login
// // dashboard
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   // 1. Check required fields
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password required" });
//   }

//   // 2. Admin login (hardcoded)
//   if (username === "admin" && password === "1234") {
//     return res.json({
//       success: true,
//       role: "admin",
//       message: "Admin login successful!",
//     });
//   }

//   try {
//     // 3. Doctor login from DB (doctors table)
//     const sql = "SELECT * FROM doctors WHERE userName = ? AND password = ?";
//     const [rows] = await pool.query(sql, [username, password]);

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const doctor = rows[0];

//     return res.json({
//       success: true,
//       role: "user", // doctor role
//       message: "Doctor login successful",
//       doctor: {
//         id: doctor.id,
//         name: doctor.name,
//         email: doctor.email,
//         specialization: doctor.specialization,
//         contactNumber: doctor.contactNumber,
//         username: doctor.userName,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// //user register
// router.post('/register', async (req, res) => {
//   const { country, phone, email, title, firstName, lastName, idType, nicOrPassport, password } = req.body;

//   try {
//     // Check for duplicates
//     const [existing] = await db.query(
//       "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
//       [email, nicOrPassport]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({ message: "Email or NIC/Passport already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user
//     await db.query(
//       `INSERT INTO users 
//        (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
//     );

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// });


// //site login
// // routes/authRoutes.js
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   try {
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = rows[0];

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Login success
//     return res.json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.first_name,
//         lastName: user.last_name,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });


// router.get('/login', authenticateToken, (req, res) => {
//   res.json({ message: 'Protected data', user: req.user });
// });


// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const [rows] = await db.query('SELECT * FROM doctors WHERE userName = ?', [username]);
//     const doctor = rows[0];

//     if (!doctor || doctor.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: doctor.id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({
//       message: 'Login successful',
//       role: 'user',
//       token,
//       doctor: {
//         id: doctor.id,
//         name: doctor.name,
//         userName: doctor.userName,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.post('/login', authController.login);

// module.exports = router;



const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // mysql2 promise pool
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");
require("dotenv").config();

// === ✅ Doctor & Admin login ===
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Admin hardcoded
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, role: "admin", token, message: "Admin login successful!" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM doctors WHERE userName = ?", [username]);
    const doctor = rows[0];

    if (!doctor || doctor.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      success: true,
      role: "user",
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        specialization: doctor.specialization,
        userName: doctor.userName,
      },
    });
  } catch (err) {
    console.error("Doctor login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// === ✅ User Register ===
router.post("/register", async (req, res) => {
  const { country, phone, email, title, firstName, lastName, idType, nicOrPassport, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
      [email, nicOrPassport]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email or NIC/Passport already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
});

// === ✅ Site User Login ===
router.post("/user-login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, role: "site_user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (err) {
    console.error("User login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Example protected route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;
