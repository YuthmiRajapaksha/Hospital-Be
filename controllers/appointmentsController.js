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

// controllers/appointmentsController.js
// controllers/appointmentsController.js
// const pool = require("../config/db");
// Count appointments by doctor ID
exports.countAppointments = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const [rows] = await pool.query(
      "SELECT COUNT(*) AS count FROM appointments WHERE doctor_id = ?",
      [doctorId]
    );

    res.json({ count: rows[0].count });
  } catch (err) {
    console.error("❌ Error counting appointments:", err);
    res.status(500).json({ error: "Server error" });
  }
};

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
    paymentId
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO appointments (
        doctor_id, doctor_name, hospital, session_date, session_time,
        patient_name, phone, country, nic, email, date, payment_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        paymentId
      ]
    );

    res.status(201).json({ message: "Appointment saved", appointmentId: result.insertId });
  } catch (err) {
    console.error("❌ Appointment Booking Error:", err);
    res.status(500).json({ error: "Database error" });
  }
};


// module.exports = {
//   createAppointment,
//   countAppointments,
// };

