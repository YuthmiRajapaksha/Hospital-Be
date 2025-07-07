
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db'); // or mysql2 promise connection

// // GET appointments for a specific doctor
// router.get('/doctor/:doctorId', async (req, res) => {
//   const { doctorId } = req.params;

//   try {
//     const [rows] = await db.query(
//       'SELECT * FROM appointments WHERE doctor_id = ? ORDER BY date DESC',
//       [doctorId]
//     );
//     res.json({ appointments: rows }); 
//   } catch (error) {
//     console.error('Error fetching doctor appointments:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;



