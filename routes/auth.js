

// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");
// const authenticateToken = require("../middleware/authenticateToken");


// router.post("/login", authController.login);


// router.post("/register", authController.registerUser);


// router.post("/user-login", authController.loginUser);

// router.put("/change-password", authenticateToken, authController.changePassword);


// router.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "Protected route accessed", user: req.user });
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");

// Doctor/Admin login
router.post("/doctor-login", authController.doctorAdminLogin);

// Site user registration
router.post("/register", authController.registerUser);

// Site user login
router.post("/login", authController.loginUser);

// Doctor password change
router.put("/change-password", authenticateToken, authController.changePassword);

// Test protected route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});
router.post("/verify-otp", authController.verifyOTP);


router.post("/send-otp", authController.sendOTP);


module.exports = router;
