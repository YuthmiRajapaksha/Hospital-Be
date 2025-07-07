

// // controllers/appointmentsController.js
// const pool = require("../config/db"); // your mysql2 pool
// const emailService = require("../utils/emailService");

// // Count appointments for a doctor in a specific hospital/session
// exports.countAppointments = async (req, res) => {
//   const doctorId = req.params.doctorId;
//   const { hospital, sessionDate, sessionTime } = req.query;

//   if (!doctorId || !hospital || !sessionDate || !sessionTime) {
//     return res.status(400).json({ error: "Missing query parameters" });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT COUNT(*) AS count FROM appointments 
//        WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
//       [doctorId, hospital, sessionDate, sessionTime]
//     );

//     res.json({ count: rows[0].count });
//   } catch (error) {
//     console.error("Count query error:", error);
//     res.status(500).json({ error: "Database error" });
//   }
// };



// exports.createAppointment = async (req, res) => {
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
//     paymentId,
//     bookingformId,
//   } = req.body;

//   if (!doctorId) {
//     return res.status(400).json({ error: "Doctor ID missing, cannot book appointment." });
//   }

//   if (!hospital || !sessionDate || !sessionTime) {
//     return res.status(400).json({ error: "Missing session data" });
//   }

//   if (!bookingformId) return res.status(400).json({ error: "Missing bookingform ID" });


//   try {
//     const userId = req.user?.id || null; // From JWT middleware

//     console.log("User from token middleware:", req.user);

//     const [result] = await pool.query(
//       `INSERT INTO appointments (
//         doctor_id, doctor_name, hospital, session_date, session_time,
//         patient_name, phone, country, nic, email, date, payment_id, user_id,bookingform_id
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
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
//         paymentId,
//         userId,
//         bookingformId
//       ]
//     );

  

//     // Send confirmation email
//     await emailService.sendAppointmentEmail({
//       patientName,
//       email,
//       doctorName,
//       hospital,
//       sessionDate,
//       sessionTime,
//       phone,
//       country,
//       nic,
//       charge: 2500,
//     });

//     res.status(201).json({ message: "Appointment created and email sent successfully" });
//   } catch (error) {
//     console.error("Create appointment error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };



// // Get logged-in user's appointments (My Bookings)
// exports.getMyAppointments = async (req, res) => {
//   try {
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const [rows] = await pool.query(
//       `SELECT * FROM appointments WHERE user_id = ? ORDER BY created_at DESC`,
//       [userId]
//     );

//     return res.json(rows);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };

// // Get appointments by doctor id (optional: you can add filters)
// exports.getAppointmentsByDoctorId = async (req, res) => {
//   const { doctorId } = req.params;

//   try {
//     const [rows] = await pool.query(
//       "SELECT * FROM appointments WHERE doctor_id = ? ORDER BY session_date, session_time",
//       [doctorId]
//     );

//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch appointments" });
//   }
// };

// exports.changeAppointmentStatus = async(req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     await pool.query(
//       "UPDATE appointments SET status = ? WHERE id = ?",
//       [status, id]
//     );

//     const [rows] = await pool.query(
//       "SELECT * FROM appointments WHERE id = ?",
//       [id]
//     );

//     const appointment = rows[0];

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
// }


// exports.updateAppointment = async (req, res) => {
//   const { id } = req.params;
//   const { hospital, session_date, session_time } = req.body;

//   if (!hospital || !session_date || !session_time) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   try {
//     // 1️⃣ Update bookingForm
//     const [result] = await db.query(
//       'UPDATE bookingForm SET hospital = ?, session_date = ?, session_time = ? WHERE id = ?',
//       [hospital, session_date, session_time, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "BookingForm not found" });
//     }

//     // 2️⃣ Update linked appointments to match new session
//     await db.query(
//       'UPDATE appointments SET hospital = ?, session_date = ?, session_time = ? WHERE bookingform_id = ?',
//       [hospital, session_date, session_time, id]
//     );

//     // 3️⃣ Find affected appointments & send update email to each patient
//     const [appointments] = await db.query(
//       'SELECT * FROM appointments WHERE bookingform_id = ?',
//       [id]
//     );

//     for (const appt of appointments) {
//       await emailService.sendAppointmentUpdateEmail({
//         patientName: appt.patient_name,
//         email: appt.email,
//         doctorName: appt.doctor_name,
//         hospital,
//         sessionDate: session_date,
//         sessionTime: session_time,
//       });
//     }

//     res.json({ message: "Session updated. Linked appointments updated. Emails sent!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error while updating session" });
//   }
// };



const pool = require("../config/db");
const emailService = require("../utils/emailService");


exports.createAppointment = async (req, res) => {
  const {
    doctorId,
    doctorName,
    hospital,
    sessionDate,
    sessionTime,
    patientName,
    phone,
    country,
    nic,
    email,
    date,
    paymentId,
    bookingformId,
  } = req.body;

  if (!doctorId) {
    return res.status(400).json({ error: "Doctor ID missing, cannot book appointment." });
  }

  if (!hospital || !sessionDate || !sessionTime) {
    return res.status(400).json({ error: "Missing session data" });
  }

  if (!bookingformId) return res.status(400).json({ error: "Missing bookingform ID" });

  try {
    const userId = req.user?.id || null; 

    const [result] = await pool.query(
      `INSERT INTO appointments (
        doctor_id, doctor_name, hospital, session_date, session_time,
        patient_name, phone, country, nic, email, date, payment_id, user_id, bookingform_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        doctorId,
        doctorName,
        hospital,
        sessionDate,
        sessionTime,
        patientName,
        phone,
        country,
        nic,
        email,
        date,
        paymentId,
        userId,
        bookingformId,
      ]
    );

   
    await emailService.sendAppointmentEmail({
      patientName,
      email,
      doctorName,
      hospital,
      sessionDate,
      sessionTime,
      phone,
      country,
      nic,
      charge: 2500,
    });

    res.status(201).json({ message: "Appointment created and email sent successfully" });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.changeAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id]);

    const [rows] = await pool.query("SELECT * FROM appointments WHERE id = ?", [id]);
    const appointment = rows[0];

    
    if (status === "cancelled") {
      await emailService.sendCancellationEmail({
        patientName: appointment.patient_name,
        email: appointment.email,
        doctorName: appointment.doctor_name,
        hospital: appointment.hospital,
        sessionDate: appointment.session_date,
        sessionTime: appointment.session_time,
        phone: appointment.phone,
        country: appointment.country,
        nic: appointment.nic,
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
};


exports.updateAppointmentDetails = async (req, res) => {
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
};


exports.getCancelledAppointmentsByDoctor = async (req, res) => {
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
};


exports.countAppointments = async (req, res) => {
  const doctorId = req.params.doctorId;
  const { hospital, sessionDate, sessionTime } = req.query;

  if (!doctorId || !hospital || !sessionDate || !sessionTime) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS count FROM appointments 
       WHERE doctor_id = ? AND hospital = ? AND session_date = ? AND session_time = ?`,
      [doctorId, hospital, sessionDate, sessionTime]
    );

    res.json({ count: rows[0].count });
  } catch (error) {
    console.error("Count query error:", error);
    res.status(500).json({ error: "Database error" });
  }
};


exports.getAppointmentsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM appointments WHERE doctor_id = ? ORDER BY session_date, session_time",
      [doctorId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};


exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [rows] = await pool.query(
    `SELECT 
        a.*,
        d.specialization
      FROM 
        appointments a
      JOIN 
        doctors d ON a.doctor_id = d.id
      WHERE 
        a.user_id = ?
      ORDER BY 
        a.created_at DESC`,
      [userId]
    );

    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


exports.getDoctorById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM doctors WHERE id = ?", [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};


exports.getAllDoctorsWithPatientCount = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.id, d.name, COUNT(a.id) AS patientCount 
      FROM doctors d 
      LEFT JOIN appointments a ON d.id = a.doctor_id 
      GROUP BY d.id;
    `);

    const doctors = rows.map(row => ({
      ...row,
      patientCount: Number(row.patientCount) || 0,
    }));

    res.status(200).json({ doctors });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get all doctors with patient count and revenue
exports.getAllDoctorsWithPatientCountAndRevenue = async (req, res) => {
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
};


exports.getPatientCountByDoctor = async (req, res) => {
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
};


exports.getTotalAppointmentsCount = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS count FROM appointments");
    res.status(200).json({ count: rows?.[0]?.count ?? 0 });
  } catch (err) {
    console.error("Error retrieving total appointments count:", err);
    res.status(500).json({ message: "Database error" });
  }
};



exports.getTodayAppointmentsCount = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; 

    const [rows] = await pool.query(
      "SELECT COUNT(*) AS count FROM appointments WHERE DATE(created_at) = ?",
      [today]
    );

    res.json({ count: rows[0].count });
  } catch (error) {
    console.error("Error fetching today's appointments count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDailyStatsByDoctor = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const [rows] = await pool.query(`
      SELECT 
        DATE(created_at) AS date,
        COUNT(*) AS patientCount,
        COUNT(*) * 2500 AS totalRevenue
      FROM appointments
      WHERE doctor_id = ?
        AND DATE(created_at) >= CURDATE() - INTERVAL 30 DAY
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
    `, [doctorId]);

    res.json({ dailyStats: rows });
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    res.status(500).json({ error: "Database error" });
  }
};