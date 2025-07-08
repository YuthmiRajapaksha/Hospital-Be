
const db = require('../config/db');
const emailService = require("../utils/emailService");


exports.saveMultipleSessions = async (req, res) => {
  const { doctorId, sessions } = req.body;

  if (!doctorId || !Array.isArray(sessions) || sessions.length === 0) {
    return res.status(400).json({ message: "Missing required fields: doctorId and sessions" });
  }

  try {
    
    const validSessions = sessions.filter(
      session => session.hospital && session.date && session.time && session.time !== "--:--"
    );

    if (validSessions.length === 0) {
      return res.status(400).json({ message: "No valid session entries provided" });
    }

    
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
      return res.status(404).json({ message: "BookingForm not found" });
    }

   
    const [appointments] = await db.query(
      `SELECT * FROM appointments WHERE bookingform_id = ? AND status = 'active'`,
      [id]
    );

    if (appointments.length === 0) {
      return res.json({
        message: "BookingForm updated. No active linked appointments to update or notify.",
      });
    }

   
    await db.query(
      `UPDATE appointments SET hospital = ?, session_date = ?, session_time = ? WHERE bookingform_id = ? AND status = 'active'`,
      [hospital, session_date, session_time, id]
    );

    
    for (const appt of appointments) {
      await emailService.sendAppointmentUpdateEmail({
        patientName: appt.patient_name,
        email: appt.email,
        doctorName: appt.doctor_name,
        hospital,
        sessionDate: session_date,
        sessionTime: session_time,
      });
    }

    res.json({
      message: `BookingForm and ${appointments.length} active appointments updated. Patients notified.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating bookingForm" });
  }
};




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









