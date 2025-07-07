// const express = require('express');
// const router = express.Router();
// const doctorController = require('../controllers/doctorController');
// const multer = require('multer');
// const authenticateToken = require('../middleware/authenticateToken'); 
// const authController = require("../controllers/authController");
// const pool = require('../config/db');

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + file.originalname;
//     cb(null, uniqueSuffix);
//   }
// });

// const upload = multer({ storage });



// router.post('/add', upload.single('photo'), doctorController.addDoctor);
// router.get('/', doctorController.getDoctors);
// router.get('/:id', doctorController.getDoctorById);
// router.put('/update/:id', upload.single('photo'), doctorController.updateDoctor);
// router.delete('/delete/:id', doctorController.deleteDoctor);
// // router.put('/reset-password/:id', doctorController.resetDoctorPassword);
// // 🔒 This uses JWT auth:
// router.put('/change-password', authenticateToken, doctorController.changeDoctorPassword);


// // Example: routes/doctors.js
// router.get("/:id/daily-stats", async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Last 30 days daily patient count & revenue grouped by session_date
//     const [rows] = await pool.query(
//       `SELECT 
//         DATE(session_date) AS date, 
//         COUNT(*) AS patientCount, 
//         COUNT(*) * 2500 AS totalRevenue
//       FROM appointments
//       WHERE doctor_id = ?
//         AND session_date >= CURDATE() - INTERVAL 30 DAY
//       GROUP BY DATE(session_date)
//       ORDER BY DATE(session_date) DESC`,
//       [id]
//     );

//     res.json({ dailyStats: rows });
//   } catch (err) {
//     console.error("DAILY STATS ERROR:", err);
//     res.status(500).json({ message: "Error fetching daily stats" });
//   }
// });






// module.exports = router;

const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const multer = require("multer");
const authenticateToken = require("../middleware/authenticateToken");

// ➜ Multer config for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ➜ Routes
router.post("/add", upload.single("photo"), doctorController.addDoctor);
router.get("/", doctorController.getDoctors);
router.get("/:id", doctorController.getDoctorById);
router.put("/update/:id", upload.single("photo"), doctorController.updateDoctor);
router.delete("/delete/:id", doctorController.deleteDoctor);
router.put("/change-password", authenticateToken, doctorController.changeDoctorPassword);

module.exports = router;
