

// controllers/bookingFormController.js
const db = require('../config/db');

// Save multiple appointment sessions
exports.saveMultipleSessions = async (req, res) => {
  const { doctorId, sessions } = req.body;

  if (!doctorId || !Array.isArray(sessions) || sessions.length === 0) {
    return res.status(400).json({ message: "Missing required fields: doctorId and sessions" });
  }

  try {
    // Filter out invalid sessions (hospital, date, time must be valid and time not "--:--")
    const validSessions = sessions.filter(
      session => session.hospital && session.date && session.time && session.time !== "--:--"
    );

    if (validSessions.length === 0) {
      return res.status(400).json({ message: "No valid session entries provided" });
    }

    // Insert all valid sessions concurrently
    await Promise.all(
      validSessions.map(({ hospital, date, time }) => {
        return db.query(
          `INSERT INTO bookingForm (doctor_id, hospital, session_date, session_time) VALUES (?, ?, ?, ?)`,
          [doctorId, hospital, date, time]
        );
      })
    );

    res.status(201).json({ message: "Appointments saved successfully" });
  } catch (error) {
    console.error("Error saving appointments:", error.sqlMessage || error.message);
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

// Get appointments for a specific doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  if (!doctorId) {
    return res.status(400).json({ message: "Missing doctorId parameter" });
  }

  try {
    const [results] = await db.query(
      `SELECT id, hospital, session_date, session_time 
       FROM bookingForm 
       WHERE doctor_id = ? 
       ORDER BY session_date ASC, session_time ASC`,
      [doctorId]
    );

    res.json({ appointments: results });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { hospital, session_date, session_time } = req.body;

  if (!hospital || !session_date || !session_time) {
    return res.status(400).json({ message: "Missing fields: hospital, session_date, and session_time are required" });
  }

  try {
    const [result] = await db.query(
      'UPDATE bookingForm SET hospital = ?, session_date = ?, session_time = ? WHERE id = ?',
      [hospital, session_date, session_time, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM bookingForm WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};









