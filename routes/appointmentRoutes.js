// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // POST route to book an appointment
// router.post('/', (req, res) => {
//   const { doctorId, patientName, date } = req.body;

//   if (!doctorId || !patientName || !date) {
//     return res.status(400).json({ error: "Missing required fields." });
//   }

//   const query = `
//     INSERT INTO appointments (doctor_id, patient_name, date)
//     VALUES (?, ?, ?)
//   `;

//   db.query(query, [doctorId, patientName, date], (err, results) => {
//     if (err) {
//       console.error("❌ Error booking appointment:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.status(200).json({ message: "✅ Appointment booked successfully" });
//   });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');
// const cors = require("cors");

// // POST route to book an appointment
// router.post("/", (req, res) => {
//   const { doctorId, session, patientName, phone, country, nic, email } = req.body;

//   // Basic validation
//   if (!doctorId || !session || !patientName || !phone || !country || !nic || !email) {
//     return res.status(400).json({ error: "❌ All fields are required." });
//   }
//    // Format session for MySQL DATETIME
//   const sessionFormatted = session.replace("T", " ");

//   const query = `
//     INSERT INTO appointments 
//     (doctor_id, session, patient_name, phone, country, nic, email)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;
//    const values = [doctorId, sessionFormatted, patientName, phone, country, nic, email];

//   db.query(
//     query,
//     [doctorId, session, patientName, phone, country, nic, email],
//     (err, results) => {
//       if (err) {
//         console.error("❌ Error booking appointment:", err);
//         return res.status(500).json({ error: "❌ Database error" });
//       }

//       res.status(201).json({ message: "✅ Appointment booked successfully" });
//     }
//   );
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');
// const cors = require("cors");

// router.use(cors()); // Enable CORS for cross-origin requests

// router.get("/count/:doctorId", (req, res) => {
//   const doctorId = req.params.doctorId;

//   const query = `
//     SELECT session_time, COUNT(*) AS count
//     FROM appointments
//     WHERE doctor_id = ?
//     GROUP BY session_time
//   `;

//   db.query(query, [doctorId], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching appointment counts:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     const counts = {};
//     results.forEach((row) => {
//       const key = row.session_time.toISOString().slice(0, 19).replace("T", " ");
//       counts[key] = row.count;
//     });

//     res.json({ counts });
//   });
// });

// // POST route to book an appointment
// router.post("/", (req, res) => {
//   const { doctorId, session, patientName, phone, country, nic, email } = req.body;

//   // Basic validation
//   if (!doctorId || !session || !patientName || !phone || !country || !nic || !email) {
//     return res.status(400).json({ error: "❌ All fields are required." });
//   }

//   // Convert session to DATETIME format (MySQL compatible)
//   const sessionFormatted = session.replace("T", " ").slice(0, 19); // e.g., "2025-06-18T10:00" -> "2025-06-18 10:00:00"

//   const query = `
//     INSERT INTO appointments 
//     (doctor_id, session_time, patient_name, phone, country, nic, email)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [doctorId, sessionFormatted, patientName, phone, country, nic, email];

//   db.query(query, values, (err, results) => {
//     if (err) {
//       console.error("❌ Error booking appointment:", err.sqlMessage || err.message);
//       return res.status(500).json({ error: "❌ Database error" });
//     }

//     res.status(201).json({ message: "✅ Appointment booked successfully" });
//   });
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const appointmentsController = require('../controllers/appointmentsController');
// const cors = require('cors');

// router.use(cors());

// // POST /api/appointments
// router.post('/', appointmentsController.bookAppointment);

// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // or mysql2 promise connection

// GET appointments for a specific doctor
router.get('/doctor/:doctorId', async (req, res) => {
  const { doctorId } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM appointments WHERE doctor_id = ? ORDER BY date DESC',
      [doctorId]
    );
    res.json({ appointments: rows }); // ✅ must match what frontend expects
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



