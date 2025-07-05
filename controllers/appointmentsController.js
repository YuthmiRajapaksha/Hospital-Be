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
// const pool = require("../config/db"); // your mysql2 pool
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const emailService = require("../utils/emailService");
// const appointmentsController = require("../controllers/appointmentsController");



// exports.countAppointments = async (req, res) => {
//   const doctorId = req.params.doctorId;
//   const { hospital, sessionDate, sessionTime } = req.query;

//   if (!doctorId || !hospital || !sessionDate || !sessionTime) {
//     return res.status(400).json({ error: "Missing query parameters" });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT COUNT(*) AS count FROM appointments 
//        WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
//       [doctorId, hospital, sessionDate, sessionTime]
//     );

//     res.json({ count: rows[0].count });
//   } catch (error) {
//     console.error("Count query error:", error);
//     res.status(500).json({ error: "Database error" });
//   }
// };



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
//     const userId = req.user?.id || null; 
//     const [result] = await pool.query(
//       `INSERT INTO appointments (
//         doctor_id, doctor_name, hospital, session_date, session_time,
//         patient_name, phone, country, nic, email, date, payment_id, user_id
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
//         userId, // ✅ save the user ID
//       ]
//     );


//     // ✅ Send confirmation email after successful insert
//     await emailService.sendAppointmentEmail({
//       patientName,
//       email,
//       doctorName,
//       hospital,
//       sessionDate,
//       sessionTime,
//       phone,
//   country,
//   nic,
//   charge: 2500
//     });

//     return res.status(201).json({ message: "Appointment created and email sent successfully" });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };



// exports.getMyAppointments = async (req, res) => {
//   try {
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const [rows] = await pool.query(
//       `SELECT * FROM appointments WHERE user_id = ? ORDER BY created_at DESC`,
//       [userId]
//     );

//     return res.json(rows);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };
// exports.deleteAppointment = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // 1️⃣ Get appointment details before deleting
//     const [rows] = await pool.query(
//       "SELECT * FROM appointments WHERE id = ?",
//       [id]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     const appointment = rows[0];

//     // 2️⃣ Delete it
//     await pool.query("DELETE FROM appointments WHERE id = ?", [id]);

//     // 3️⃣ Send cancellation email
//     await emailService.sendCancellationEmail({
//       patientName: appointment.patient_name,
//       email: appointment.email,
//       doctorName: appointment.doctor_name,
//       hospital: appointment.hospital,
//       sessionDate: appointment.session_date,
//       sessionTime: appointment.session_time,
//       phone: appointment.phone,
//       country: appointment.country,
//       nic: appointment.nic,
//     });

//     res.json({ message: "Appointment deleted and cancellation email sent." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// controllers/appointmentsController.js
const pool = require("../config/db"); // your mysql2 pool
const emailService = require("../utils/emailService");

// Count appointments for a doctor in a specific hospital/session
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

// Create a new appointment and send confirmation email
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
//     const userId = req.user?.id || null; // from auth middleware

//     const [result] = await pool.query(
//       `INSERT INTO appointments (
//         doctor_id, doctor_name, hospital, session_date, session_time,
//         patient_name, phone, country, nic, email, date, payment_id, user_id
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
//         userId, // save the logged-in user id
//       ]
//     );

//     // Send confirmation email
//     await emailService.sendAppointmentEmail({
//       patientName,
//       email,
//       doctorName,
//       hospital,
//       sessionDate,
//       sessionTime,
//       phone,
//       country,
//       nic,
//       charge: 2500, // hardcoded charge amount or get dynamically
//     });

//     return res.status(201).json({ message: "Appointment created and email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };

// const pool = require("../config/db");
// const emailService = require("../utils/emailService");

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

  if (!doctorId) {
    return res.status(400).json({ error: "Doctor ID missing, cannot book appointment." });
  }

  if (!hospital || !sessionDate || !sessionTime) {
    return res.status(400).json({ error: "Missing session data" });
  }

  try {
    const userId = req.user?.id || null; // From JWT middleware

    console.log("User from token middleware:", req.user);

    const [result] = await pool.query(
      `INSERT INTO appointments (
        doctor_id, doctor_name, hospital, session_date, session_time,
        patient_name, phone, country, nic, email, date, payment_id, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        userId,
      ]
    );

    // Send confirmation email
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
      charge: 2500,
    });

    res.status(201).json({ message: "Appointment created and email sent successfully" });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



// Get logged-in user's appointments (My Bookings)
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [rows] = await pool.query(
      `SELECT * FROM appointments WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Get appointments by doctor id (optional: you can add filters)
exports.getAppointmentsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM appointments WHERE doctor_id = ? ORDER BY session_date, session_time",
      [doctorId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

exports.changeAppointmentStatus = async(req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.query(
      "UPDATE appointments SET status = ? WHERE id = ?",
      [status, id]
    );

    const [rows] = await pool.query(
      "SELECT * FROM appointments WHERE id = ?",
      [id]
    );

    const appointment = rows[0];

    // Send cancellation email
        await emailService.sendCancellationEmail({
          patientName: appointment.patient_name,
          email: appointment.email,
          doctorName: appointment.doctor_name,
          hospital: appointment.hospital,
          sessionDate: appointment.session_date,
          sessionTime: appointment.session_time,
          phone: appointment.phone,
          country: appointment.country,
          nic: appointment.nic,
        });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
}

// Delete appointment by id and send cancellation email
// exports.deleteAppointment = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Get appointment details before deleting
//     const [rows] = await pool.query(
//       "SELECT * FROM appointments WHERE id = ?",
//       [id]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     const appointment = rows[0];
//     console.log("log");

//     // Delete appointment
//     // await pool.query("DELETE FROM appointments WHERE id = ?", [id]);
    

//     // Send cancellation email
//     await emailService.sendCancellationEmail({
//       patientName: appointment.patient_name,
//       email: appointment.email,
//       doctorName: appointment.doctor_name,
//       hospital: appointment.hospital,
//       sessionDate: appointment.session_date,
//       sessionTime: appointment.session_time,
//       phone: appointment.phone,
//       country: appointment.country,
//       nic: appointment.nic,
//     });

//     res.json({ message: "Appointment deleted and cancellation email sent." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };




// module.exports = {
//   createAppointment,
//   countAppointments,
// };

