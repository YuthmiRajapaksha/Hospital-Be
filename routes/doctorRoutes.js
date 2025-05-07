// const express = require('express');
// const router = express.Router();
// const doctorController = require('../controllers/doctorController');

// // Route for adding a doctor
// router.post('/add', doctorController.addDoctor);

// // Route for getting all doctors
// router.get('/', doctorController.getDoctors);


// // Route for updating a doctor by ID
// router.put('/update/:id', doctorController.updateDoctor);


// // Route for getting a doctor by ID
// router.get('/:id', doctorController.getDoctorById);


// router.delete('/delete/:id', doctorController.deleteDoctor);


// // Export the router
// module.exports = router;



const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const multer = require('multer');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// Routes
router.post('/add', upload.single('photo'), doctorController.addDoctor);
router.post('/add', doctorController.addDoctor);

router.get('/', doctorController.getDoctors);
router.put('/update/:id', upload.single('photo'), doctorController.updateDoctor);
router.get('/:id', doctorController.getDoctorById);
router.delete('/delete/:id', doctorController.deleteDoctor);

module.exports = router;

