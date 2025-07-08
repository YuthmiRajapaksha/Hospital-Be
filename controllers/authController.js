


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


//user register
exports.registerUser = async (req, res) => {
  const { country, phone, email, title, firstName, lastName, idType, nicOrPassport, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {

 let finalNIC = nicOrPassport.trim();

    if (idType === "NIC") {
      if (/^\d{9}$/.test(finalNIC)) {
        finalNIC += "V";
      }
      finalNIC = finalNIC.toUpperCase();
    }

    const [existing] = await db.query(
  "SELECT * FROM users WHERE email = ? OR nic_or_passport = ?",
  [email, finalNIC]
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




//user login
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


//doctor password change
exports.changePassword = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { currentPassword, newPassword } = req.body;
  const doctorId = req.user.id;

  try {
    const [rows] = await db.query("SELECT * FROM doctors WHERE id = ?", [doctorId]);
    const doctor = rows[0];

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(currentPassword, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE doctors SET password = ? WHERE id = ?", [hashedPassword, doctorId]);

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error("Password change error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
