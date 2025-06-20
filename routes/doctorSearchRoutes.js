// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // Search doctors with availability
// router.get("/search", async (req, res) => {
//   const { name, specialization, hospital, date } = req.query;

//   try {
//     let query = `
//       SELECT d.*, a.session_date, a.session_time, a.hospital AS appointment_hospital
//       FROM doctors d
//       LEFT JOIN appointments a ON d.id = a.doctor_id
//       WHERE 1=1
//     `;
//     const params = [];

//     if (name) {
//       query += " AND d.name LIKE ?";
//       params.push(`%${name}%`);
//     }
//     if (specialization) {
//       query += " AND d.specialization LIKE ?";
//       params.push(`%${specialization}%`);
//     }
//     if (hospital) {
//       query += " AND a.hospital LIKE ?";
//       params.push(`%${hospital}%`);
//     }
//     if (date) {
//       query += " AND DATE(a.session_date) = ?";
//       params.push(date);
//     }

//     const [rows] = await db.query(query, params);
//     res.json({ doctors: rows });
//   } catch (err) {
//     console.error("Doctor search error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // Search doctors with availability
// router.get("/search", async (req, res) => {
//   const { name, specialization, hospital, date } = req.query;

//   try {
//     let query = `
//       SELECT d.*, a.session_date, a.session_time, a.hospital AS appointment_hospital
//       FROM doctors d
//       LEFT JOIN appointments a ON d.id = a.doctor_id
//       WHERE 1=1
//     `;
//     const params = [];

//     if (name) {
//       query += " AND d.name LIKE ?";
//       params.push(`%${name}%`);
//     }
//     if (specialization) {
//       query += " AND d.specialization LIKE ?";
//       params.push(`%${specialization}%`);
//     }
//     if (hospital) {
//       query += " AND a.hospital LIKE ?";
//       params.push(`%${hospital}%`);
//     }
//     if (date) {
//       query += " AND DATE(a.session_date) = ?";
//       params.push(date);
//     }

//     const [rows] = await db.query(query, params);
//     res.json({ doctors: rows });
//   } catch (err) {
//     console.error("Doctor search error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const db = require("../config/db"); // mysql2 connection with promise support

// router.get("/search", async (req, res) => {
//   try {
//     const { doctorName, hospital, date } = req.query;

//     // Base query with JOIN if needed to get doctor and appointment info
//     let query = `SELECT * FROM appointments WHERE 1=1`;
//     const params = [];

//     if (doctorName) {
//       query += ` AND doctor_name LIKE ?`;
//       params.push(`%${doctorName}%`);
//     }
//     if (hospital) {
//       query += ` AND hospital = ?`;
//       params.push(hospital);
//     }
//     if (date) {
//       query += ` AND appointment_date = ?`;
//       params.push(date);
//     }

//     query += ` ORDER BY appointment_date, appointment_time`;

//     const [rows] = await db.query(query, params);

//     res.json(rows);
//   } catch (error) {
//     console.error("Error searching appointments:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { searchDoctors } = require("../controllers/doctorSearchController");

router.get("/search", searchDoctors);

module.exports = router;
