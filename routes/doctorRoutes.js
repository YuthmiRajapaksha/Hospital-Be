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
// router.post('/add', upload.single('photo'), doctorController.addDoctor);
// // router.post('/add', doctorController.addDoctor);

// router.get('/', doctorController.getDoctors);
// router.put('/update/:id', upload.single('photo'), doctorController.updateDoctor);
// router.get('/:id', doctorController.getDoctorById);
// router.delete('/delete/:id', doctorController.deleteDoctor);
// router.post('/add', doctorController.addDoctor);

router.post('/add', upload.single('photo'), doctorController.addDoctor);
router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.put('/update/:id', upload.single('photo'), doctorController.updateDoctor);
router.delete('/delete/:id', doctorController.deleteDoctor);



module.exports = router;

