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


