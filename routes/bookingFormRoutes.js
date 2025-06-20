// const express = require('express');
// const router = express.Router();
// // const db = require('../db/db');

// // POST /api/bookingForm/multiple
// router.post("/multiple", async (req, res) => {
//   const { doctorId, hospital, dates, time } = req.body;

//   if (!doctorId || !hospital || !Array.isArray(dates) || dates.length === 0 || !time) {
//     return res.status(400).json({ message: "Missing or invalid fields" });
//   }

//   try {
//     for (const date of dates) {
//       await db.query(
//         `INSERT INTO appointments (doctor_id, hospital, date, time)
//          VALUES (?, ?, ?, ?)`,
//         [doctorId, hospital, date, time]
//       );
//     }

//     res.json({ message: "✅ Multiple bookings saved successfully!" });
//   } catch (error) {
//     console.error("❌ DB error inserting bookings:", error);
//     res.status(500).json({ message: "Database error" });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { saveMultipleSessions } = require("../controllers/bookingFormController");
// // const db = require('../db/db');

// // Save multiple sessions (one time, multiple dates)
// router.post("/multiple", saveMultipleSessions);
// router.post("/multiple", async (req, res) => {
//       console.log("📥 /bookingForm/multiple hit with:", req.body); // <--- Add this
//   const { doctorId, hospital, dates, time } = req.body;

//   if (!doctorId || !hospital || !Array.isArray(dates) || dates.length === 0 || !time) {
//     return res.status(400).json({ message: "Missing or invalid fields" });
//   }

//   try {
//     for (const date of dates) {
//       await db.query(
//         `INSERT INTO bookingForm (doctor_id, hospital, session_date, session_time)
//          VALUES (?, ?, ?, ?)`,
//         [doctorId, hospital, date, time]
//       );
//     }

//     res.json({ message: "✅ Appointments saved for multiple dates." });
//   } catch (error) {
//     console.error("❌ DB error inserting bookings:", error);
//     res.status(500).json({ message: "Database error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const bookingFormController = require("../controllers/bookingFormController");

// // Create multiple booking sessions at once
// router.post("/multiple", bookingFormController.saveMultipleSessions);

// // Update a specific booking session by its ID
// router.put("/:id", bookingFormController.updateBookingSession);
// router.get('/doctor/:doctorId', bookingFormController.getAppointmentsByDoctor);


// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../config/db'); // mysql2 pool
// const bookingFormController = require('../controllers/bookingFormController');

// // Save multiple appointments
// router.post('/multiple', async (req, res) => {
//   const { doctorId, hospital, dates, time } = req.body;

//   if (!doctorId || !hospital || !Array.isArray(dates) || !time) {
//     return res.status(400).json({ message: 'Missing fields' });
//   }

//   try {
//     for (const date of dates) {
//       const datetime = `${date}T${time}:00`;
//       await db.query(
//         'INSERT INTO appointments (doctor_id, hospital, date) VALUES (?, ?, ?)',
//         [doctorId, hospital, datetime]
//       );
//     }
//     res.status(201).json({ message: 'Appointments saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving appointments' });
//   }
// });

// module.exports = router;


// routes/bookingFormRoutes.js
// const express = require('express');
// const router = express.Router();
// const bookingFormController = require('../controllers/bookingFormController');

// router.post('/multiple', bookingFormController.saveMultipleSessions);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bookingFormController = require('../controllers/bookingFormController');
// const db = require('../config/db'); // your mysql2 promise pool

// // Save multiple appointment sessions
// router.post('/multiple', bookingFormController.saveMultipleSessions);

// // Get appointments for a specific doctor
// // ✅ Add this route to fetch doctor sessions from bookingForm table
// router.get('/doctor/:doctorId', bookingFormController.getAppointmentsByDoctor)
// router.get('/doctor/:doctorId', async (req, res) => {
//   const { doctorId } = req.params;
//   try {
//     const [results] = await db.query(
//       'SELECT id, hospital, date FROM appointments WHERE doctor_id = ? ORDER BY date ASC',
//       [doctorId]
//     );
//     res.json({ appointments: results });
//   } catch (err) {
//     console.error('Error fetching appointments:', err);
//     res.status(500).json({ message: 'Error fetching appointments' });
//   }
// });

// // Update appointment
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { hospital, date } = req.body;
//   try {
//     await db.query('UPDATE appointments SET hospital = ?, date = ? WHERE id = ?', [
//       hospital,
//       date,
//       id,
//     ]);
//     res.json({ message: 'Appointment updated' });
//   } catch (err) {
//     console.error('Error updating appointment:', err);
//     res.status(500).json({ message: 'Error updating appointment' });
//   }
// });

// // Delete appointment
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db.query('DELETE FROM appointments WHERE id = ?', [id]);
//     res.json({ message: 'Appointment deleted' });
//   } catch (err) {
//     console.error('Error deleting appointment:', err);
//     res.status(500).json({ message: 'Error deleting appointment' });
//   }
// });

// module.exports = router;


// routes/bookingFormRoutes.js
const express = require('express');
const router = express.Router();
const bookingFormController = require('../controllers/bookingFormController');

// Save multiple appointment sessions
router.post('/multiple', bookingFormController.saveMultipleSessions);

// Get appointments for a specific doctor
router.get('/doctor/:doctorId', bookingFormController.getAppointmentsByDoctor);

// Update appointment by ID
router.put('/:id', bookingFormController.updateAppointment);

// Delete appointment by ID
router.delete('/:id', bookingFormController.deleteAppointment);

module.exports = router;





