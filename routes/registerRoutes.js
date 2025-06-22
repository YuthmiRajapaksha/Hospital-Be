
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');
// const bcrypt = require('bcrypt');

// // Route: POST /api/register
// router.post('/register', async (req, res) => {
//   const {
//     country,
//     phone,
//     email,
//     title,
//     firstName,
//     lastName,
//     idType,
//     nic,
//     password
//   } = req.body;

//   console.log("Registering user with:", req.body);

//   try {
//     // Hash the password securely
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const query = `
//       INSERT INTO users 
//         (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       country,
//       phone,
//       email,
//       title,
//       firstName,
//       lastName,
//       idType,
//       nic,
//       hashedPassword
//     ];

//     console.log("Executing query with values:", values);

//     db.query(query, values, (err, result) => {
//       if (err) {
//         console.error('Error registering user:', err.sqlMessage || err.message || err);

//         if (err.code === 'ER_DUP_ENTRY') {
//           return res.status(400).json({ message: 'Email or NIC/Passport already exists' });
//         }

//         return res.status(500).json({ message: 'Registration failed', error: err.sqlMessage });
//       }

//       res.status(200).json({ message: 'User registered successfully' });
//     });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Server error during registration' });
//   }
// });

// module.exports = router;
 // 📁 routes/register.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db'); // mysql2 promise pool
// const bcrypt = require('bcrypt');

// // POST /api/register
// router.post('/register', async (req, res) => {
//   const {
//     country,
//     phone,
//     email,
//     title,
//     firstName,
//     lastName,
//     idType,
//     nicOrPassport,
//     password,
//   } = req.body;

//   try {
//     // Check for duplicates
//     const [existing] = await db.promise().query(
//       "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
//       [email, nicOrPassport]
//     );

//     if (existing.length > 0) {
//       console.log("❌ Duplicate user detected.");
//       return res.status(400).json({ message: "Email or NIC/Passport already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert into DB
//     await db.promise().query(
//       `INSERT INTO users 
//        (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
//     );

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("❌ Registration Error:", err);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // mysql2 promise pool
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'your_jwt_secret_key_here';

router.post('/register', async (req, res) => {
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
console.log("log")
  try {
    // Check for existing email or NIC
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
      [email, nicOrPassport]
    );

    if (existing.length > 0) {
      console.log("❌ Duplicate user detected.");
      return res.status(400).json({ message: "Email or NIC/Passport already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    await db.query(
      `INSERT INTO users 
      (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("this is log",email)

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

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
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
