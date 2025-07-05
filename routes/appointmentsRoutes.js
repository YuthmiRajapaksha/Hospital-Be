// // routes/appointmentRoutes.js
// const express = require("express");
// const router = express.Router();
// const { getAppointmentsByPatient } = require("../controllers/appointmentController");

// router.get("/appointments/user/:name", getAppointmentsByPatient);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // Get appointments for a specific doctor
// router.get("/doctor/:doctorId", async (req, res) => {
//   const { doctorId } = req.params;

//   try {
//     const [rows] = await db.query(
//       "SELECT * FROM appointments WHERE doctor_id = ? ORDER BY date DESC",
//       [doctorId]
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error("Error fetching doctor appointments:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const pool = require("../db");

// // POST /api/appointments
// router.post("/", async (req, res) => {
//   try {
//     const {
//       doctorId,
//       session_date,
//       session_time,
//       patientName,
//       phone,
//       country,
//       nic,
//       email,
//       paymentId,
//     } = req.body;

//     // Combine date + time into one DATETIME field
//     const dateTime = `${session_date} ${session_time}`;

//     const [result] = await pool.query(
//       `INSERT INTO appointments 
//        (doctor_id, date, patient_name, phone, country, nic, email) 
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [doctorId, dateTime, patientName, phone, country, nic, email]
//     );

//     res.status(200).json({ message: "Booking saved", appointmentId: result.insertId });
//   } catch (err) {
//     console.error("❌ Error saving appointment:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// router.get("/appointments/count/:doctorId", async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       "SELECT COUNT(*) AS count FROM appointments WHERE doctor_id = ?",
//       [req.params.doctorId]
//     );
//     res.json({ count: rows[0].count });
//   } catch (err) {
//     res.status(500).json({ error: "Database error" });
//   }
// });


// router.post("/appointments", async (req, res) => {
//   const { doctorId, date, patientName, phone, country, nic, email, paymentId } = req.body;
//   try {
//     await pool.query(
//       "INSERT INTO appointments (doctor_id, date, patient_name, phone, country, nic, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [doctorId, date, patientName, phone, country, nic, email]
//     );
//     res.status(201).json({ message: "Appointment saved" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Insert failed" });
//   }
// });



// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const pool = require("../db");

// // POST /api/appointments — Create a new appointment
// router.post("/", async (req, res) => {
//   try {
//     const {
//       doctorId,
//       date,
//       time,
//       patientName,
//       phone,
//       country,
//       nic,
//       email,
//       paymentId // Optional, included for tracking if needed
//     } = req.body;

//     // Combine date and time
//     const dateTime = `${date} ${time}`;

//     const [result] = await pool.query(
//       `INSERT INTO appointments 
//         (doctor_id, date, patient_name, phone, country, nic, email, payment_id) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [doctorId, dateTime, patientName, phone, country, nic, email, paymentId || null]
//     );

//     res.status(201).json({ message: "Appointment saved", appointmentId: result.insertId });
//   } catch (err) {
//     console.error("❌ Error saving appointment:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // GET /api/appointments/count/:doctorId — Count active appointments
// router.get("/count/:doctorId", async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       "SELECT COUNT(*) AS count FROM appointments WHERE doctor_id = ?",
//       [req.params.doctorId]
//     );
//     res.json({ count: rows[0].count });
//   } catch (err) {
//     console.error("❌ Error fetching count:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// module.exports = router;


// backend/routes/appointments.js

// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db");

// // POST /api/appointments — Create a new appointment
// router.post("/", async (req, res) => {
//   try {
//     const {
//       doctorId,
//       date, // full date + time from frontend
//       patientName,
//       phone,
//       country,
//       nic,
//       email,
//       paymentId
//     } = req.body;

//      const dateTime = date;

//     const [result] = await pool.query(
//       `INSERT INTO appointments 
//         (doctor_id, date, patient_name, phone, country, nic, email, payment_id) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [doctorId, date, patientName, phone, country, nic, email, paymentId || null]
//     );

//     res.status(201).json({ message: "Appointment saved", appointmentId: result.insertId });
//   } catch (err) {
//     console.error("❌ Error saving appointment:", err); // SHOW FULL ERROR
//     res.status(500).json({ error: "Internal Server Error", details: err.message });
//   }
// });

// // GET /api/appointments/count/:doctorId — Count active appointments for a doctor
// router.get("/count/:doctorId", async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       "SELECT COUNT(*) AS count FROM appointments WHERE doctor_id = ?",
//       [req.params.doctorId]
//     );
//     res.json({ count: rows[0].count });
//   } catch (err) {
//     console.error("❌ Error fetching count:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// module.exports = router;


// routes/appointmentsRoutes.js


// router.post("/", async (req, res) => {
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
//     paymentId
//   } = req.body;

//   try {
//     // 1. Check how many existing appointments for this session
//     const [countResult] = await pool.execute(
//       `SELECT COUNT(*) AS count FROM appointments 
//        WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
//       [doctorId, hospital, sessionDate, sessionTime]
//     );

//     const currentCount = countResult[0].count;

//     // 2. If already 5 or more, reject
//     if (currentCount >= 5) {
//       return res.status(400).json({ error: "This session is fully booked." });
//     }

//     // 3. Otherwise, insert appointment
//     await pool.execute(
//       `INSERT INTO appointments 
//         (doctor_id, doctor_name, hospital, session_date, session_time,
//          patient_name, phone, country, nic, email, booked_at, payment_id) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
//         paymentId
//       ]
//     );

//     res.status(200).json({ message: "Appointment booked successfully." });

//   } catch (err) {
//     console.error("Appointment Booking Error:", err);
//     res.status(500).json({ error: "Server error. Try again later." });
//   }
// });



// router.post("/", async (req, res) => {
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
//     date,       // assume format 'YYYY-MM-DD HH:mm:ss'
//     paymentId
//   } = req.body;

//   try {
//     // Check current count
//     const [countResult] = await pool.execute(
//       `SELECT COUNT(*) AS count FROM appointments 
//        WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
//       [doctorId, hospital, sessionDate, sessionTime]
//     );

//     const currentCount = countResult[0].count;

//     if (currentCount >= 5) {
//       return res.status(400).json({ error: "This session is fully booked." });
//     }

//     // Insert appointment
//     await pool.execute(
//       `INSERT INTO appointments 
//         (doctor_id, doctor_name, hospital, session_date, session_time,
//          patient_name, phone, country, nic, email, booked_at, payment_id) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
//         paymentId
//       ]
//     );

//     return res.status(201).json({ message: "Appointment booked successfully." });

//   } catch (err) {
//     console.error("Appointment Booking Error:", err);
//     return res.status(500).json({ error: "Server error. Try again later." });
//   }
// });


// module.exports = router;



// backend/routes/appointments.js
// const express = require("express");
// const router = express.Router();
// const pool = require("../db/db");

// router.post("/", async (req, res) => {
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
//     paymentId
//   } = req.body;

//   try {
//     const [countResult] = await pool.execute(
//       `SELECT COUNT(*) AS count FROM appointments 
//        WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
//       [doctorId, hospital, sessionDate, sessionTime]
//     );

//     const currentCount = countResult[0].count;

//     if (currentCount >= 5) {
//       return res.status(400).json({ error: "This session is fully booked." });
//     }

//     const formattedSessionDate = new Date(sessionDate).toISOString().split("T")[0];
// const formattedSessionTime = sessionTime?.padEnd(8, ":00");

//     await pool.execute(
//       `INSERT INTO appointments 
//         (doctor_id, doctor_name, hospital, session_date, session_time,
//          patient_name, phone, country, nic, email, date, payment_id) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
//         paymentId
//       ]
//     );

//     res.status(200).json({ message: "Appointment booked successfully." });

//   } catch (err) {
//     console.error("Appointment Booking Error:", err);
//     res.status(500).json({ error: "Server error. Try again later." });
//   }
// });



// const express = require("express");
// const pool = require("../config/db");
// const router = express.Router();
// const { createAppointment, countAppointments } = require("../controllers/appointmentsController");



// router.post("/", createAppointment);
// router.get("/count/:doctorId", countAppointments);

// router.post("/", async (req, res) => {
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
//     paymentId
//   } = req.body;

//   try {
//     const formattedSessionDate = sessionDate; 
//     const formattedSessionTime =
//       sessionTime.length === 5 ? sessionTime + ":00" : sessionTime;

//     const [countResult] = await pool.execute(
//       `SELECT COUNT(*) AS count FROM appointments 
//        WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
//       [doctorId, hospital, formattedSessionDate, formattedSessionTime]
//     );

//     const currentCount = countResult[0].count;

//     if (currentCount >= 5) {
//       return res.status(400).json({ error: "This session is fully booked." });
//     }

//     await pool.execute(
//       `INSERT INTO appointments 
//         (doctor_id, doctor_name, hospital, session_date, session_time,
//          patient_name, phone, country, nic, email, date, payment_id) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         doctorId,
//         doctorName,
//         hospital,
//         formattedSessionDate,
//         formattedSessionTime,
//         patientName,
//         phone,
//         country,
//         nic,
//         email,
//         date,
//         paymentId
//       ]
//     );

//     res.status(200).json({ message: "Appointment booked successfully." });

//   } catch (err) {
//     console.error("Appointment Booking Error:", err);
//     res.status(500).json({ error: "Server error. Try again later." });
//   }
// });


// module.exports = router;


const express = require("express");
const pool = require ("../config/db"); 
const router = express.Router();
const {
  createAppointment,
  countAppointments,
  getAppointmentsByDoctorId,
  changeAppointmentStatus,
} = require("../controllers/appointmentsController");
const appointmentsController = require("../controllers/appointmentsController");
const authenticateToken = require("../middleware/authenticateToken");


router.post("/", authenticateToken, createAppointment);
router.put("/appointments/:id/status", authenticateToken, changeAppointmentStatus);
 // ✅ clean
// router.get("/count/:doctorId", countAppointments);


// router.delete('/appointments/:id', appointmentsController.deleteAppointment)

// ✅ Update appointment status (cancel)
// router.put("/appointments/:id/status", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     await pool.query(
//       "UPDATE appointments SET status = ? WHERE id = ?",
//       [status, id]
//     );

//     // Send cancellation email
//         await emailService.sendCancellationEmail({
//           patientName: appointment.patient_name,
//           email: appointment.email,
//           doctorName: appointment.doctor_name,
//           hospital: appointment.hospital,
//           sessionDate: appointment.session_date,
//           sessionTime: appointment.session_time,
//           phone: appointment.phone,
//           country: appointment.country,
//           nic: appointment.nic,
//         });

//     res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update status" });
//   }
// });

// ✅ Get cancelled appointments for a doctor
router.get("/api/appointments/doctor/:doctorId/cancelled", async (req, res) => {
  const { doctorId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM appointments WHERE doctor_id = ? AND status = 'cancelled'",
      [doctorId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cancelled appointments" });
  }
});



router.get('/count/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  const { hospital, sessionDate, sessionTime } = req.query;

  if (!hospital || !sessionDate || !sessionTime) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS count FROM appointments WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
      [doctorId, hospital, sessionDate, sessionTime]
    );
    res.json(rows[0]); // { count: number }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});


// routes/appointments.js
router.get("/doctor/:doctorId", getAppointmentsByDoctorId);
// router.delete('/appointments/:id', async (req, res) => {
//   const [result] = await pool.query("DELETE FROM appointments WHERE id = ?", [req.params.id]);
//   res.json({ success: true });
// });

router.put('/appointments/:id', async (req, res) => {
  const id = req.params.id;
  const { patient_name, phone, nic, email } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE appointments SET patient_name = ?, phone = ?, nic = ?, email = ? WHERE id = ?",
      [patient_name, phone, nic, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// GET /api/doctors/:id
router.get("/api/doctors/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM doctors WHERE id = ?", [req.params.id]);
  if (rows.length > 0) {
    res.json(rows[0]);
  } else {
    res.status(404).json({ message: "Doctor not found" });
  }
});

// GET /api/doctors
router.get("/api/doctors", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.id, d.name, COUNT(a.id) AS patientCount FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id;
    `);

    // Convert string "patientCount" to integer
    const doctors = rows.map(row => ({
      ...row,
      patientCount: Number(row.patientCount) || 0,
    }));

    res.status(200).json({ doctors });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// GET /api/doctors-with-patient-count
// routes/appointments.js or routes/doctors.js
router.get("/api/doctors-with-patient-count", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.id, 
        d.name, 
        COUNT(a.id) AS patientCount,
        COUNT(a.id) * 2500 AS totalRevenue
      FROM doctors d
      LEFT JOIN appointments a ON d.id = a.doctor_id
      GROUP BY d.id
    `);

    res.status(200).json({ doctors: rows });
  } catch (err) {
    console.error("Error fetching doctors with patient count:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// GET patient count for a specific doctor
router.get("/api/doctors/:id/patient-count", async (req, res) => {
  const doctorId = req.params.id;

  try {
    const [result] = await pool.query(
      "SELECT COUNT(*) AS patientCount FROM appointments WHERE doctor_id = ?",
      [doctorId]
    );

    res.json({ doctorId, patientCount: result[0].patientCount });
  } catch (error) {
    console.error("Error fetching patient count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", authenticateToken, appointmentsController.createAppointment);

// Get logged-in user's appointments (My Bookings)
router.get("/my", authenticateToken, appointmentsController.getMyAppointments);



module.exports = router;



