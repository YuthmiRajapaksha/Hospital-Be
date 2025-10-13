

const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");
const authenticateToken = require("../middleware/authenticateToken");

// Create appointment 
router.post("/", authenticateToken, appointmentsController.createAppointment);

// router.post("/", bookAppointment);

// Change appointment status 
router.put("/appointments/:id/status", authenticateToken, appointmentsController.changeAppointmentStatus);


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

router.get("/count-week", appointmentsController.getWeekAppointmentsCount);

//Get patients with revenue
router.get("/api/doctors/:id/daily-stats", appointmentsController.getDailyStatsByDoctor);

router.post("/cancelByPatient/:id", authenticateToken, appointmentsController.cancelAppointmentByPatient);



module.exports = router;

