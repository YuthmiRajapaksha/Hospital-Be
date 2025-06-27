const express = require("express");
const router = express.Router();
const {
  getAllReports,
  addLabReport,
  updateLabReport,
  deleteLabReport,
  checkLabReportStatus,
} = require("../controllers/labReportController");

router.get("/count", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM lab_reports");
    const count = rows?.[0]?.count ?? 0;
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error retrieving lab reports count:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
});

router.get("/", getAllReports);
router.post("/add", addLabReport);
router.put("/update/:id", updateLabReport);

router.delete("/delete/:id", deleteLabReport);
router.get("/check/:referenceNumber", checkLabReportStatus);

module.exports = router;



  





