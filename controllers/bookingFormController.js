// const db = require('../db/db'); // Make sure this is the correct path

// const db = require('../config/db');

// exports.saveMultipleSessions = async (req, res) => {
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

//     res.json({ message: "✅ Appointments saved to bookingForm." });
//   } catch (err) {
//     console.error("❌ DB Error:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };


// controllers/bookingFormController.js

// const db = require('../config/db');

// exports.saveMultipleSessions = async (req, res) => {
//   const { doctorId, hospital, dates, time } = req.body;

//   if (!doctorId || !hospital || !Array.isArray(dates) || dates.length === 0 || !time) {
//     return res.status(400).json({ message: "Missing or invalid fields" });
//   }

//   try {
//     for (const date of dates) {
//       await db.query(
//         `INSERT INTO bookingForm (doctor_id, hospital, session_date, session_time) VALUES (?, ?, ?, ?)`,
//         [doctorId, hospital, date, time]
//       );
//     }

//     res.json({ message: "✅ Appointments saved to bookingForm." });
//   } catch (err) {
//     console.error("❌ DB Error:", err.message);
//     res.status(500).json({ message: "Failed to save appointments", error: err.message });
//   }
// };

// const db = require('../config/db');

// // Save multiple sessions for a doctor
// exports.saveMultipleSessions = async (req, res) => {
//   const { doctorId, hospital, dates, time } = req.body;

//   if (!doctorId || !hospital || !Array.isArray(dates) || dates.length === 0 || !time) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   // try {
//   //   // Insert each date + time as a separate session
//   //   const insertPromises = dates.map(date => {
//   //     // Format date and time into MySQL DATETIME
//   //     const dateTime = `${date} ${time}:00`; // e.g. '2023-06-19 15:00:00'
//   //     const query = `
//   //       INSERT INTO bookingForm (doctor_id, hospital, session_date, session_time)
//   //       VALUES (?, ?, ?, ?)
//   //     `;
//   //     return db.query(query, [doctorId, hospital, date, time]);
//   //   });

//   try {
//     const insertPromises = dates.map(date => {
//       return db.query(
//         `INSERT INTO bookingForm (doctor_id, hospital, session_date, session_time)
//          VALUES (?, ?, ?, ?)`,
//         [doctorId, hospital, date, time]
//       );
//     });

//     await Promise.all(insertPromises);

//     res.status(201).json({ message: "Sessions saved successfully" });
//   } catch (error) {
//     console.error("Error saving sessions:", error);
//     res.status(500).json({ message: "Database error", error });
//   }
// };

// exports.getAppointmentsByDoctor = async (req, res) => {
//   const { doctorId } = req.params;
//   try {
//     const [rows] = await db.query('SELECT * FROM appointments WHERE doctor_id = ? ORDER BY date ASC', [doctorId]);
//     res.json({ appointments: rows });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch appointments' });
//   }
// };

// // Update a booking session by ID
// exports.updateBookingSession = async (req, res) => {
//   const { id, hospital, session_date, session_time } = req.body;

//   if (!id || !hospital || !session_date || !session_time) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const query = `
//       UPDATE bookingForm
//       SET hospital = ?, session_date = ?, session_time = ?
//       WHERE id = ?
//     `;
//     const [result] = await db.query(query, [hospital, session_date, session_time, id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Session not found" });
//     }

//     res.json({ message: "Session updated successfully" });
//   } catch (error) {
//     console.error("Error updating session:", error);
//     res.status(500).json({ message: "Database error", error });
//   }
// };


// // controllers/bookingFormController.js
// const db = require('../config/db');

// exports.saveMultipleSessions = async (req, res) => {
//   const { doctorId, hospital, dates, time } = req.body;

//   if (!doctorId || !hospital || !Array.isArray(dates) || dates.length === 0 || !time) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     for (const date of dates) {
//       // Use space between date and time for MySQL DATETIME
//       const datetime = `${date} ${time}:00`;
//       await db.query(
//        `INSERT INTO bookingForm (doctor_id, hospital, session_date, session_time)
//          VALUES (?, ?, ?, ?)`,
//           [doctorId, hospital, date, time]
//       );
//     }

//     res.status(201).json({ message: "Appointments saved successfully" });
//   } catch (error) {
//     console.error("Error saving appointments:", error);
//     res.status(500).json({ message: "Database error", error: error.message });
//   }
// };


// controllers/bookingFormController.js
// const db = require('../config/db');

// exports.saveMultipleSessions = async (req, res) => {
//   const { doctorId, hospital, sessions } = req.body;

//   if (!doctorId || !hospital || !Array.isArray(sessions) || sessions.length === 0) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const validSessions = sessions.filter(session => session.date && session.time);

//     if (validSessions.length === 0) {
//       return res.status(400).json({ message: "No valid session entries provided" });
//     }

//     // ✅ Insert into appointments table instead of bookingForm
//     await Promise.all(
//       validSessions.map(({ date, time }) => {
//         const datetime = `${date}T${time}:00`;
//         return db.query(
//           `INSERT INTO appointments (doctor_id, hospital, date) VALUES (?, ?, ?)`,
//           [doctorId, hospital, datetime]
//         );
//       })
//     );

//     res.status(201).json({ message: "Appointments saved successfully" });
//   } catch (error) {
//     console.error("Error saving appointments:", error);
//     res.status(500).json({ message: "Database error", error: error.message });
//   }
// };



// const db = require('../config/db');

// exports.saveMultipleSessions = async (req, res) => {
//   const { doctorId, sessions } = req.body;

//   if (!doctorId || !Array.isArray(sessions) || sessions.length === 0) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     // Filter valid sessions that have hospital, date and time
//     const validSessions = sessions.filter(
//       (session) => session.hospital && session.date && session.time
//     );

//     if (validSessions.length === 0) {
//       return res.status(400).json({ message: "No valid session entries provided" });
//     }

//     // Insert all valid sessions into the database
//     await Promise.all(
//       validSessions.map(({ hospital, date, time }) => {
//         const datetime = `${date}T${time}:00`;
//         return db.query(
//           `INSERT INTO appointments (doctor_id, hospital, date) VALUES (?, ?, ?)`,
//           [doctorId, hospital, datetime]
//         );
//       })
//     );

//     res.status(201).json({ message: "Appointments saved successfully" });
//   } catch (error) {
//     console.error("Error saving appointments:", error);
//     res.status(500).json({ message: "Database error", error: error.message });
//   }
// };


// controllers/bookingFormController.js
// const db = require('../config/db'); // mysql2 promise pool

// exports.saveMultipleSessions = async (req, res) => {
//   const { doctorId, sessions } = req.body;

//   if (!doctorId || !Array.isArray(sessions) || sessions.length === 0) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const validSessions = sessions.filter(
//       session => session.hospital && session.date && session.time && session.time !== "--:--"
//     );

//     if (validSessions.length === 0) {
//       return res.status(400).json({ message: "No valid session entries provided" });
//     }

//     await Promise.all(
//       validSessions.map(({ hospital, date, time }) => {
//         // Format datetime for MySQL DATETIME
//         const datetime = `${date} ${time}:00`;
//         return db.query(
//           `INSERT INTO bookingForm (doctor_id, hospital, session_date, session_time) VALUES (?, ?, ?, ?)`,
//       [doctorId, hospital, date, time]
//         );
//       })
//     );

//     res.status(201).json({ message: "Appointments saved successfully" });
//   } catch (error) {
//     console.error("Error saving appointments:", error.sqlMessage || error.message, error.sql);
//     res.status(500).json({ message: "Database error", error: error.message });
//   }
// };


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









