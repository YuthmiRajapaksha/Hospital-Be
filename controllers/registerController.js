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


