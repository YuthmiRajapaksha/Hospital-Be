// // routes/appointmentRoutes.js
// const express = require("express");
// const router = express.Router();
// const { getAppointmentsByPatient } = require("../controllers/appointmentController");

// router.get("/appointments/user/:name", getAppointmentsByPatient);

// module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get appointments for a specific doctor
router.get("/doctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM appointments WHERE doctor_id = ? ORDER BY date DESC",
      [doctorId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching doctor appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
