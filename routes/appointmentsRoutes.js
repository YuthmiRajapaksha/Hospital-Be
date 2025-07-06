


// const express = require("express");
// const pool = require ("../config/db"); 
// const router = express.Router();
// const {
//   createAppointment,
//   countAppointments,
//   getAppointmentsByDoctorId,
//   changeAppointmentStatus,
// } = require("../controllers/appointmentsController");
// const appointmentsController = require("../controllers/appointmentsController");
// const authenticateToken = require("../middleware/authenticateToken");


// router.post("/", authenticateToken, createAppointment);
// router.put("/appointments/:id/status", authenticateToken, changeAppointmentStatus);
 

// // ✅ Get cancelled appointments for a doctor
// router.get("/api/appointments/doctor/:doctorId/cancelled", async (req, res) => {
//   const { doctorId } = req.params;

//   try {
//     const [rows] = await pool.query(
//       "SELECT * FROM appointments WHERE doctor_id = ? AND status = 'cancelled'",
//       [doctorId]
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch cancelled appointments" });
//   }
// });



// router.get('/count/:doctorId', async (req, res) => {
//   const { doctorId } = req.params;
//   const { hospital, sessionDate, sessionTime } = req.query;

//   if (!hospital || !sessionDate || !sessionTime) {
//     return res.status(400).json({ error: "Missing query parameters" });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT COUNT(*) AS count FROM appointments WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
//       [doctorId, hospital, sessionDate, sessionTime]
//     );
//     res.json(rows[0]); // { count: number }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Database error" });
//   }
// });


// // routes/appointments.js
// router.get("/doctor/:doctorId", getAppointmentsByDoctorId);


// router.put('/appointments/:id', async (req, res) => {
//   const id = req.params.id;
//   const { patient_name, phone, nic, email } = req.body;

//   try {
//     const [result] = await pool.query(
//       "UPDATE appointments SET patient_name = ?, phone = ?, nic = ?, email = ? WHERE id = ?",
//       [patient_name, phone, nic, email, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: "Failed to update appointment" });
//   }
// });

// // GET /api/doctors/:id
// router.get("/api/doctors/:id", async (req, res) => {
//   const [rows] = await pool.query("SELECT * FROM doctors WHERE id = ?", [req.params.id]);
//   if (rows.length > 0) {
//     res.json(rows[0]);
//   } else {
//     res.status(404).json({ message: "Doctor not found" });
//   }
// });

// // GET /api/doctors
// router.get("/api/doctors", async (req, res) => {
//   try {
//     const [rows] = await pool.query(`
//       SELECT d.id, d.name, COUNT(a.id) AS patientCount FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id GROUP BY d.id;
//     `);

//     // Convert string "patientCount" to integer
//     const doctors = rows.map(row => ({
//       ...row,
//       patientCount: Number(row.patientCount) || 0,
//     }));

//     res.status(200).json({ doctors });
//   } catch (err) {
//     console.error("Error fetching doctors:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// });

// // GET /api/doctors-with-patient-count
// // routes/appointments.js or routes/doctors.js
// router.get("/api/doctors-with-patient-count", async (req, res) => {
//   try {
//     const [rows] = await pool.query(`
//       SELECT 
//         d.id, 
//         d.name, 
//         COUNT(a.id) AS patientCount,
//         COUNT(a.id) * 2500 AS totalRevenue
//       FROM doctors d
//       LEFT JOIN appointments a ON d.id = a.doctor_id
//       GROUP BY d.id
//     `);

//     res.status(200).json({ doctors: rows });
//   } catch (err) {
//     console.error("Error fetching doctors with patient count:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// });

// // GET patient count for a specific doctor
// router.get("/api/doctors/:id/patient-count", async (req, res) => {
//   const doctorId = req.params.id;

//   try {
//     const [result] = await pool.query(
//       "SELECT COUNT(*) AS patientCount FROM appointments WHERE doctor_id = ?",
//       [doctorId]
//     );

//     res.json({ doctorId, patientCount: result[0].patientCount });
//   } catch (error) {
//     console.error("Error fetching patient count:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.post("/", authenticateToken, appointmentsController.createAppointment);

// // Get logged-in user's appointments (My Bookings)
// router.get("/my", authenticateToken, appointmentsController.getMyAppointments);



// module.exports = router;


const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");
const authenticateToken = require("../middleware/authenticateToken");

// Create appointment (protected)
router.post("/", authenticateToken, appointmentsController.createAppointment);

// Change appointment status (protected)
router.put("/appointments/:id/status", authenticateToken, appointmentsController.changeAppointmentStatus);

// Update appointment details
router.put('/appointments/:id', appointmentsController.updateAppointmentDetails);

// Get cancelled appointments for a doctor
router.get("/api/appointments/doctor/:doctorId/cancelled", appointmentsController.getCancelledAppointmentsByDoctor);

// Count appointments for a doctor in a session
router.get('/count/:doctorId', appointmentsController.countAppointments);

// Get appointments by doctor id
router.get("/doctor/:doctorId", appointmentsController.getAppointmentsByDoctorId);

// Get logged-in user's appointments (My Bookings)
router.get("/my", authenticateToken, appointmentsController.getMyAppointments);

// Get doctor by id
router.get("/api/doctors/:id", appointmentsController.getDoctorById);

// Get all doctors with patient count
router.get("/api/doctors", appointmentsController.getAllDoctorsWithPatientCount);

// Get all doctors with patient count and revenue
router.get("/api/doctors-with-patient-count", appointmentsController.getAllDoctorsWithPatientCountAndRevenue);

// Get patient count for a specific doctor
router.get("/api/doctors/:id/patient-count", appointmentsController.getPatientCountByDoctor);

router.get("/count-all", appointmentsController.getTotalAppointmentsCount);

router.get("/count-today", appointmentsController.getTodayAppointmentsCount);


module.exports = router;

