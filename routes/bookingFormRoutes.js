
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

router.post("/sessions/multiple", bookingFormController.saveMultipleSessions);

router.get("/sessions/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const [sessions] = await pool.query(
      `SELECT bf.id, bf.session_date, bf.session_time, bf.hospital,
              COUNT(b.id) AS booking_count
       FROM bookingform bf
       LEFT JOIN appointments b 
       ON bf.id = b.session_id
       WHERE bf.doctor_id = ? AND bf.session_date >= CURDATE()
       GROUP BY bf.id
       ORDER BY bf.session_date ASC, bf.session_time ASC`,
      [doctorId]
    );

    res.json(sessions);
  } catch (err) {
    console.error("Error loading sessions:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});


// Get all sessions for a doctor with assigned appointment count
router.get("/doctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  try {
    const [sessions] = await pool.query(
      `SELECT bf.id, bf.hospital, bf.session_date, bf.session_time, bf.max_appointments,
              COUNT(a.id) AS assigned_count
       FROM bookingForm bf
       LEFT JOIN appointments a ON a.session_id = bf.id
       WHERE bf.doctor_id = ?
       GROUP BY bf.id, bf.hospital, bf.session_date, bf.session_time, bf.max_appointments
       ORDER BY bf.session_date, bf.session_time`,
      [doctorId]
    );

    res.json({ appointments: sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;






