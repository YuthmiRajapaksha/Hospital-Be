

const pool = require("../db"); 

// GET all bookings for a doctor
exports.getBookingsByDoctor = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM bookingform WHERE doctor_id = ? ORDER BY session_date ASC, session_time ASC",
      [req.params.doctorId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// UPDATE a booking by ID
exports.updateBooking = async (req, res) => {
  const { hospital, session_date, session_time } = req.body;
  try {
    await pool.query(
      "UPDATE bookingform SET hospital = ?, session_date = ?, session_time = ? WHERE id = ?",
      [hospital, session_date, session_time, req.params.id]
    );
    res.json({ message: "Appointment updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update" });
  }
};

// DELETE a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    await pool.query("DELETE FROM bookingform WHERE id = ?", [req.params.id]);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete" });
  }
};
