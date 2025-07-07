
// const db = require("../config/db");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// // Doctor + Admin Login
// const login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password required" });
//   }

//   // Admin hardcoded
//   if (username === "admin" && password === "1234") {
//     const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     return res.json({ success: true, role: "admin", token, message: "Admin login successful" });
//   }

//   // Doctor from DB
//   try {
//     const [rows] = await db.query("SELECT * FROM doctors WHERE userName = ?", [username]);
//     const doctor = rows[0];

//     if (!doctor || doctor.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: doctor.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({
//       success: true,
//       role: "user",
//       token,
//       doctor: {
//         id: doctor.id,
//         name: doctor.name,
//         email: doctor.email,
//         specialization: doctor.specialization,
//         userName: doctor.userName,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // User Register
// const registerUser = async (req, res) => {
//   const { country, phone, email, title, firstName, lastName, idType, nicOrPassport, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   try {
//     // Check duplicate
//     const [existing] = await db.query(
//       "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
//       [email, nicOrPassport]
//     );
//     if (existing.length > 0) {
//       return res.status(400).json({ message: "Email or NIC/Passport already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.query(
//       `INSERT INTO users (country, phone, email, title, first_name, last_name, id_type, nic_or_passport, password)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [country, phone, email, title, firstName, lastName, idType, nicOrPassport, hashedPassword]
//     );

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // User Login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   try {
//     const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = rows[0];
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ id: user.id, role: "site_user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
//     // Decode the token to check expiry timestamp
//     const decoded = jwt.decode(token);
//     const currentTime = Math.floor(Date.now() / 1000); // seconds
//     console.log("✅ JWT Details:");
//     console.log("  Exp (UNIX):", decoded.exp);
//     console.log("  Now (UNIX):", currentTime);
//     console.log("  Token valid for:", decoded.exp - currentTime, "seconds");

//     res.json({
//       success: true,
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
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   login,
//   registerUser,
//   loginUser,
// };


const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Dashboard
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

 
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, role: "admin", token, message: "Admin login successful" });
  }

 
  try {
    const [rows] = await db.query("SELECT * FROM doctors WHERE userName = ?", [username]);
    const doctor = rows[0];

    

    if (!doctor) {
  return res.status(401).json({ message: "Invalid credentials" });
}

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
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
    console.error("Doctor/Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.registerUser = async (req, res) => {
  const { country, phone, email, title, firstName, lastName, idType, nicOrPassport, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
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


exports.loginUser = async (req, res) => {
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

    const token = jwt.sign({ id: user.id, role: "site_user" }, process.env.JWT_SECRET, { expiresIn: "1h" });

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
    console.error("User login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
