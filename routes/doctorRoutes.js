

const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const multer = require("multer");
const authenticateToken = require("../middleware/authenticateToken");


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });


router.post("/add", upload.single("photo"), doctorController.addDoctor);
router.get("/", doctorController.getDoctors);
router.get("/:id", doctorController.getDoctorById);
router.put("/update/:id", upload.single("photo"), doctorController.updateDoctor);
router.delete("/delete/:id", doctorController.deleteDoctor);
;

module.exports = router;
