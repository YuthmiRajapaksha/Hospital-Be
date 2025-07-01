// controllers/authController.js
// const db = require('../db');
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
//     nicOrPassport,  // Updated variable name to match your schema
//     password
//   } = req.body;

//   try {
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

//     const query = `
//       INSERT INTO users (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword];

//     db.query(query, values, (err, result) => {
//       if (err) {
//         console.error('Error inserting user:', err);
//         return res.status(500).json({ error: 'Database error' });
//       }

//       res.status(201).json({ message: 'User registered successfully' });
//     });
//   } catch (error) {
//     console.error('Error in registerUser:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = { registerUser };

const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my_super_secret_123';

exports.registerUser = async (req, res) => {
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
    // Check for existing email or NIC
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
      [email, nicOrPassport]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email or NIC/Passport already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.query(
      `INSERT INTO users 
       (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid email or password" });

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      JWT_SECRET,
      { expiresIn: 300 }
    );

    const decoded = jwt.decode(token);
console.log("Token issued at:", new Date(decoded.iat * 1000));
console.log("Token expires at:", new Date(decoded.exp * 1000));
console.log("Expires in seconds:", decoded.exp - decoded.iat);

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

