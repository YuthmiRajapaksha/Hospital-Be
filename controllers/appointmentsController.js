// // controllers/appointmentController.js
// const db = require("../config/db");

// const getAppointmentsByPatient = async (req, res) => {
//   const { name } = req.params; // or use NIC for more security

//   try {
//     const [rows] = await db.query(
//       "SELECT * FROM appointments WHERE patient_name = ? ORDER BY session_date, session_time",
//       [name]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "No appointments found for this user" });
//     }

//     res.status(200).json({ appointments: rows });
//   } catch (err) {
//     console.error("Error fetching user appointments:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// module.exports = {
//   getAppointmentsByPatient,
// };

// controllers/appointmentsController.js
// const pool = require("../config/db");

// Create new appointment
// controllers/appointmentsController.js
// const pool = require("../db");

// exports.createAppointment = async (req, res) => {
//   try {
//     const {
//       doctorId,
//       date,  // full datetime string from frontend
//       patientName,
//       phone,
//       country,
//       nic,
//       email,
//       paymentId
//     } = req.body;

//     if (!doctorId || !date || !patientName) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const [result] = await pool.query(
//       `INSERT INTO appointments
//        (doctor_id, date, patient_name, phone, country, nic, email, payment_id)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [doctorId, date, patientName, phone, country, nic, email, paymentId || null]
//     );

//     res.status(201).json({ message: "Appointment saved", appointmentId: result.insertId });
//   } catch (err) {
//     console.error("❌ Error saving appointment:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



// // Count active appointments
// const countAppointments = async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       "SELECT COUNT(*) AS count FROM appointments WHERE doctor_id = ?",
//       [req.params.doctorId]
//     );
//     res.json({ count: rows[0].count });
//   } catch (err) {
//     console.error("\u274C Error fetching count:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// };


//working
// controllers/appointmentsController.js
const pool = require("../config/db"); // your mysql2 pool
const nodemailer = require("nodemailer");
const emailService = require("../utils/emailService");


// controllers/appointmentsController.js
// controllers/appointmentsController.js
// const pool = require("../config/db");
// Count appointments by doctor ID
// controllers/appointmentsController.js
exports.countAppointments = async (req, res) => {
  const doctorId = req.params.doctorId;
  const { hospital, sessionDate, sessionTime } = req.query;

  if (!doctorId || !hospital || !sessionDate || !sessionTime) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS count FROM appointments 
       WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
      [doctorId, hospital, sessionDate, sessionTime]
    );

    res.json({ count: rows[0].count });
  } catch (error) {
    console.error("Count query error:", error);
    res.status(500).json({ error: "Database error" });
  }
};


// exports.createAppointment = async (req, res) => {
//   const {
//     doctorId,
//     doctorName,
//     hospital,
//     sessionDate,
//     sessionTime,
//     patientName,
//     phone,
//     country,
//     nic,
//     email,
//     date,
//     paymentId,
//   } = req.body;

//   // 🔍 Add this:
//   console.log("Received appointment data:", req.body);

//   if (!hospital || !sessionDate || !sessionTime) {
//     return res.status(400).json({ error: "Missing session data" });
//   }

//   try {
//     const [result] = await pool.query(
//       `INSERT INTO appointments (
//         doctor_id, doctor_name, hospital, session_date, session_time,
//         patient_name, phone, country, nic, email, date, payment_id
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         doctorId,
//         doctorName,
//         hospital,
//         sessionDate,
//         sessionTime,
//         patientName,
//         phone,
//         country,
//         nic,
//         email,
//         date,
//         paymentId,
//       ]
//     );

//     res.status(201).json({ message: "Appointment saved", appointmentId: result.insertId });
//   } catch (err) {
//     console.error("❌ Appointment Booking Error:", err); // 👈 Show full error
//     res.status(500).json({ error: "Database error" });
//   }
// };




// const pool = require("../config/db");

// exports.createAppointment = async (req, res) => {
//   const {
//     doctorId,
//     doctorName,
//     hospital,
//     sessionDate,
//     sessionTime,
//     patientName,
//     phone,
//     country,
//     nic,
//     email,
//     date,
//     paymentId,
//   } = req.body;

//   console.log("Received appointment data:", req.body);

//   if (!hospital || !sessionDate || !sessionTime) {
//     return res.status(400).json({ error: "Missing session data" });
//   }

//   try {
//     const [result] = await pool.query(
//       `INSERT INTO appointments (
//         doctor_id, doctor_name, hospital, session_date, session_time,
//         patient_name, phone, country, nic, email, date, payment_id
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         doctorId,
//         doctorName,
//         hospital,
//         sessionDate,
//         sessionTime,
//         patientName,
//         phone,
//         country,
//         nic,
//         email,
//         date,
//         paymentId,
//       ]
//     );

//     // ✅ Send email after saving
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'nirajapaksha1988@gmail.com',   // 🔁 Replace with your Gmail
//         pass: 'tnpvqlnygljndqsf'           // ⚠️ Will likely fail unless it's an App Password
//       }
//     });

//     const mailOptions = {
//       from: 'nirajapaksha1988@gmail.com',
//       to: email,
//       subject: 'Appointment Confirmation',
//       html: `
//         <h2>Appointment Confirmation</h2>
//         <p>Dear ${patientName},</p>
//         <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
//         <p><strong>Hospital:</strong> ${hospital}</p>
//         <p><strong>Date:</strong> ${sessionDate}</p>
//         <p><strong>Time:</strong> ${sessionTime}</p>
//         <p><strong>Patient Name:</strong> ${patientName}</p>
//         <p><strong>NIC:</strong> ${nic}</p>
//         <p><strong>Country:</strong> ${country}</p>
//         <p><strong>Charge:</strong> LKR 2500</p>
//         <p>Thank you for booking your appointment.</p>
//       `
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("❌ Email failed:", error);
//         // continue anyway
//       } else {
//         console.log("✅ Email sent:", info.response);
//       }
//     });

//     res.status(201).json({ message: "Appointment saved and email sent", appointmentId: result.insertId });
//   } catch (err) {
//     console.error("❌ Appointment Booking Error:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// };

exports.createAppointment = async (req, res) => {
  const {
    doctorId,
    doctorName,
    hospital,
    sessionDate,
    sessionTime,
    patientName,
    phone,
    country,
    nic,
    email,
    date,
    paymentId,
  } = req.body;

  console.log("Received appointment data:", req.body);

  if (!hospital || !sessionDate || !sessionTime) {
    return res.status(400).json({ error: "Missing session data" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO appointments (
        doctor_id, doctor_name, hospital, session_date, session_time,
        patient_name, phone, country, nic, email, date, payment_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        doctorId,
        doctorName,
        hospital,
        sessionDate,
        sessionTime,
        patientName,
        phone,
        country,
        nic,
        email,
        date,
        paymentId,
      ]
    );

    // ✅ Send confirmation email after successful insert
    await emailService.sendAppointmentEmail({
      patientName,
      email,
      doctorName,
      hospital,
      sessionDate,
      sessionTime,
      phone,
  country,
  nic,
  charge: 2500
    });

    return res.status(201).json({ message: "Appointment created and email sent successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// controllers/appointmentsController.js 
exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const [rows] = await pool.query(
      `SELECT id, doctor_name, hospital, session_date, session_time, 
              patient_name, phone, email, nic, date
       FROM appointments
       WHERE doctor_id = ?
       ORDER BY session_date DESC, session_time DESC`,
      [doctorId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching appointments:", err);
    res.status(500).json({ error: "Server error" });
  }
};







// module.exports = {
//   createAppointment,
//   countAppointments,
// };

