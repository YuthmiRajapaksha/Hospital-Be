// const db = require('../config/db');
// const pool = require("../config/db"); 
// const path = require('path');
// const nodemailer = require("nodemailer");
// const emailService = require ("../utils/emailService");


// // ✅ doctorController.js
// // const emailService = require("../utils/emailService");
// const addDoctor = async (req, res) => {
//   const {
//     name,
//     specialization,
//     workExperience,
//     qualifications,
//     address,
//     email,
//     contactNumber,
//     userName,
//     password,
//   } = req.body;

//   const photo = req.file ? req.file.filename : null;

//   if (!name || !specialization || !userName || !password || !email) {
//     return res.status(400).json({
//       message: "Name, Specialization, Username, Password, and Email are required!",
//     });
//   }

//   const query = `
//     INSERT INTO doctors 
//       (name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password, photo)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     name,
//     specialization,
//     workExperience || null,
//     qualifications || null,
//     address || null,
//     email,
//     contactNumber || null,
//     userName,
//     password,
//     photo,
//   ];

//   try {
//     const [result] = await pool.query(query, values);

//     // ✅ AFTER INSERTING → send credentials to entered email
//     await emailService.sendDoctorCredentials({
//       name,
//       email,
//       userName,
//       password,
//     });

//     res
//       .status(201)
//       .json({
//         message: "Doctor added and credentials email sent!",
//         doctorId: result.insertId,
//       });
//   } catch (err) {
//     console.error("Error inserting doctor:", err);
//     res.status(500).json({ message: "Database error", error: err });
//   }
// };




// // Example updateDoctor route handler
// exports.updateDoctor = async (req, res) => {
//   const doctorId = req.params.id;
//   const { name, specialization, email, contactNumber, userName } = req.body;
//   const photo = req.file ? req.file.filename : null;

//   try {
//     const [result] = await pool.query(
//       `UPDATE doctors SET name=?, specialization=?, email=?, contactNumber=?, userName=?, photo=?
//        WHERE id=?`,
//       [name, specialization, email, contactNumber, userName, photo, doctorId]
//     );

//     res.status(200).json({ message: "Doctor updated successfully!" });

//   } catch (error) {
//     console.error("❌ Error updating doctor:", error);
//     res.status(500).json({ message: "Failed to update doctor" });
//   }
// }; 
// //////////////////////


// // Get all doctors
// const getDoctors = async (req, res) => {
//   const query = 'SELECT * FROM doctors';
//   try {
//     const [results] = await db.query(query);
//     res.status(200).json({ doctors: results });
//   } catch (err) {
//     console.error('Error fetching doctors:', err);
//     res.status(500).json({ message: 'Database error', error: err });
//   }
// };

// // Get a doctor by ID
// const getDoctorById = async (req, res) => {
//   const { id } = req.params;
//   const query = 'SELECT * FROM doctors WHERE id = ?';
//   try {
//     const [results] = await db.query(query, [id]);
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }
//     res.status(200).json({ doctor: results[0] });
//   } catch (err) {
//     console.error('Error fetching doctor:', err);
//     res.status(500).json({ message: 'Database error', error: err });
//   }
// };

// // Update doctor with optional photo
// const updateDoctor = async (req, res) => {
//   const { id } = req.params;
//   const { name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password } = req.body;
//   const photoPath = req.file ? req.file.path : null;

//   if (!name || !specialization || !userName || !password) {
//     return res.status(400).json({ message: 'Name, Specialization, Username, and Password are required!' });
//   }

//   const query = photoPath
//     ? `UPDATE doctors SET name = ?, specialization = ?, workExperience = ?, qualifications = ?, address = ?, email = ?, contactNumber = ?, userName = ?, password = ?, photo = ? WHERE id = ?`
//     : `UPDATE doctors SET name = ?, specialization = ?, workExperience = ?, qualifications = ?, address = ?, email = ?, contactNumber = ?, userName = ?, password = ? WHERE id = ?`;

//   const values = photoPath
//     ? [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password, photoPath, id]
//     : [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password, id];

//   try {
//     const [result] = await db.query(query, values);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }
//     res.status(200).json({ message: 'Doctor updated successfully' });
//   } catch (err) {
//     console.error('Error updating doctor:', err);
//     res.status(500).json({ message: 'Database error', error: err });
//   }
// };

// // Delete doctor
// const deleteDoctor = async (req, res) => {
//   const { id } = req.params;
//   const query = 'DELETE FROM doctors WHERE id = ?';
//   try {
//     const [result] = await db.query(query, [id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }
//     res.status(200).json({ message: 'Doctor deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting doctor:', err);
//     res.status(500).json({ message: 'Database error', error: err });
//   }
// };



// // Reset Doctor Password (by admin or authorized user)
// // Doctor changes their own password
// const changeDoctorPassword = async (req, res) => {
//   const doctorId = req.user?.id;
//   const { currentPassword, newPassword } = req.body;

//   if (!doctorId) return res.status(401).json({ message: 'Unauthorized' });
//   if (!currentPassword || !newPassword)
//     return res.status(400).json({ message: 'Current and new password required' });

//   try {
//     const [rows] = await db.query('SELECT password FROM doctors WHERE id = ?', [doctorId]);
//     if (rows.length === 0) return res.status(404).json({ message: 'Doctor not found' });

//     const doctor = rows[0];
//     if (doctor.password !== currentPassword)
//       return res.status(400).json({ message: 'Current password is incorrect' });

//     await db.query('UPDATE doctors SET password = ? WHERE id = ?', [newPassword, doctorId]);

//     res.json({ message: 'Password changed successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Database error' });
//   }
// };



// module.exports = {
//   addDoctor,
//   getDoctors,
//   getDoctorById,
//   updateDoctor,
//   deleteDoctor,
//   changeDoctorPassword 
// };


const pool = require("../config/db");
const emailService = require("../utils/emailService");

// ➜ Add new doctor & send credentials email
exports.addDoctor = async (req, res) => {
  const {
    name,
    specialization,
    workExperience,
    qualifications,
    address,
    email,
    contactNumber,
    userName,
    password,
  } = req.body;

  const photo = req.file ? req.file.filename : null;

  if (!name || !specialization || !userName || !password || !email) {
    return res.status(400).json({
      message: "Name, Specialization, Username, Password, and Email are required!",
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO doctors 
        (name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password, photo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        specialization,
        workExperience || null,
        qualifications || null,
        address || null,
        email,
        contactNumber || null,
        userName,
        password,
        photo,
      ]
    );

    await emailService.sendDoctorCredentials({
      name,
      email,
      userName,
      password,
    });

    res.status(201).json({
      message: "Doctor added and credentials email sent!",
      doctorId: result.insertId,
    });
  } catch (err) {
    console.error("Error adding doctor:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
};

// ➜ Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM doctors");
    res.status(200).json({ doctors: results });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// ➜ Get single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM doctors WHERE id = ?", [req.params.id]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ doctor: results[0] });
  } catch (err) {
    console.error("Error fetching doctor:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// ➜ Update doctor (including photo if provided)
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    specialization,
    workExperience,
    qualifications,
    address,
    email,
    contactNumber,
    userName,
    password,
  } = req.body;

  const photo = req.file ? req.file.filename : null;

  if (!name || !specialization || !userName || !password) {
    return res.status(400).json({ message: "Name, Specialization, Username, and Password are required!" });
  }

  const query = photo
    ? `UPDATE doctors SET name=?, specialization=?, workExperience=?, qualifications=?, address=?, email=?, contactNumber=?, userName=?, password=?, photo=? WHERE id=?`
    : `UPDATE doctors SET name=?, specialization=?, workExperience=?, qualifications=?, address=?, email=?, contactNumber=?, userName=?, password=? WHERE id=?`;

  const values = photo
    ? [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password, photo, id]
    : [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password, id];

  try {
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor updated successfully!" });
  } catch (err) {
    console.error("Error updating doctor:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// ➜ Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM doctors WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully!" });
  } catch (err) {
    console.error("Error deleting doctor:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// ➜ Change doctor password (only for logged-in doctor)
exports.changeDoctorPassword = async (req, res) => {
  const doctorId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  if (!doctorId) return res.status(401).json({ message: "Unauthorized" });
  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: "Current and new password required" });

  try {
    const [rows] = await pool.query("SELECT password FROM doctors WHERE id = ?", [doctorId]);
    if (rows.length === 0) return res.status(404).json({ message: "Doctor not found" });

    if (rows[0].password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    await pool.query("UPDATE doctors SET password = ? WHERE id = ?", [newPassword, doctorId]);
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Database error" });
  }
};