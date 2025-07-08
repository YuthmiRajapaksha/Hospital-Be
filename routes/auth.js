

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");


router.post("/login", authController.login);


router.post("/register", authController.registerUser);


router.post("/user-login", authController.loginUser);

router.put("/change-password", authenticateToken, authController.changePassword);


router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;
