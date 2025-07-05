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



// const pool = require("../config/db");
// const bcrypt = require('bcrypt');

// const registerUser = async (req, res) => {
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
//     // Check duplicates by email or NIC/passport
//     const [existing] = await pool.query(
//       "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
//       [email, nicOrPassport]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({ message: "Email or NIC/Passport already exists." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user with hashed password and correct field names
//     await pool.query(
//       `INSERT INTO users 
//        (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
//     );

//     return res.status(201).json({ message: "User registered successfully." });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
// console.log("this is done")
//   // Basic validation
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   try {
//     // Find user by email
//     const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = rows[0];

//     // Compare password with hash
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Successful login response (can add JWT token here if you want)
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
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "Server error during login" });
//   }
// };

// module.exports = { registerUser, loginUser };



// authController.js
// const jwt = require("jsonwebtoken");
// const pool = require("../config/db");
// const bcrypt = require('bcrypt');

// const JWT_SECRET = "your_secret_key"; // use env var in production!

// // Middleware to authenticate token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Access denied, token missing" });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid or expired token" });

//     req.user = user;
//     next();
//   });
// };

// // Register user
// const registerUser = async (req, res) => {
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
//     // Check duplicates by email or NIC/passport
//     const [existing] = await pool.query(
//       "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
//       [email, nicOrPassport]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({ message: "Email or NIC/Passport already exists." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     await pool.query(
//       `INSERT INTO users 
//        (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
//     );

//     return res.status(201).json({ message: "User registered successfully." });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Login user & send JWT with 30m expiry
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   try {
//     const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = rows[0];

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Create JWT token with 30 min expiry
//     const token = jwt.sign(
//       { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name },
//       JWT_SECRET,
//       { expiresIn: '30m' }
//     );

//     return res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.first_name,
//         lastName: user.last_name,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "Server error during login" });
//   }
// };


// const login = async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ message: 'Username and password required' });

//   try {
//     const [rows] = await db.query('SELECT * FROM doctors WHERE userName = ?', [username]);
//     if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

//     const doctor = rows[0];
//     if (doctor.password !== password)
//       return res.status(401).json({ message: 'Invalid credentials' });

//     // Create JWT payload
//     const payload = { id: doctor.id, role: 'user' }; // add other info as needed

//     // Sign token
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

//     res.json({ token, role: payload.role, doctor: { id: doctor.id, name: doctor.name } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { registerUser, loginUser, authenticateToken,login };



const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Doctor + Admin Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Admin hardcoded
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, role: "admin", token, message: "Admin login successful" });
  }

  // Doctor from DB
  try {
    const [rows] = await db.query("SELECT * FROM doctors WHERE userName = ?", [username]);
    const doctor = rows[0];

    if (!doctor || doctor.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      role: "user",
      token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        userName: doctor.userName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// User Register
const registerUser = async (req, res) => {
  const { country, phone, email, title, firstName, lastName, idType, nicOrPassport, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // Check duplicate
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
      [email, nicOrPassport]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email or NIC/Passport already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, role: "site_user" }, process.env.JWT_SECRET, { expiresIn: "5m" });
    
    // Decode the token to check expiry timestamp
    const decoded = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000); // seconds
    console.log("✅ JWT Details:");
    console.log("  Exp (UNIX):", decoded.exp);
    console.log("  Now (UNIX):", currentTime);
    console.log("  Token valid for:", decoded.exp - currentTime, "seconds");

    res.json({
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
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  registerUser,
  loginUser,
};


