const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Route for adding a doctor
router.post('/add', doctorController.addDoctor);

// Route for getting all doctors
router.get('/', doctorController.getDoctors);

// Route for getting a doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Export the router
module.exports = router;
