// const express = require("express");
// const router = express.Router();
// const {
//   getAllReports,
//   addLabReport,
//   updateLabReport,
//   deleteLabReport,
//   checkLabReportStatus,
//   getTodayLabReportsCount
// } = require("../controllers/labReportController");

// router.get("/count", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT COUNT(*) AS count FROM lab_reports");
//     const count = rows?.[0]?.count ?? 0;
//     res.status(200).json({ count });
//   } catch (err) {
//     console.error("Error retrieving lab reports count:", err);
//     res.status(500).json({ message: "Database error", error: err });
//   }
// });

// router.get("/", getAllReports);
// router.post("/add", addLabReport);
// router.put("/update/:id", updateLabReport);

// router.delete("/delete/:id", deleteLabReport);
// router.get("/check/:referenceNumber", checkLabReportStatus);
// router.get("/count-today", getTodayLabReportsCount);

// module.exports = router;



  
// routes/labReportRoutes.js

const express = require("express");
const router = express.Router();
const labReportController = require("../controllers/labReportController");

// ✅ Get total lab reports count
router.get("/count", labReportController.getLabReportsTotalCount);

// ✅ Get all lab reports
router.get("/", labReportController.getAllReports);

// ✅ Add new lab report
router.post("/add", labReportController.addLabReport);

// ✅ Update lab report by ID
router.put("/update/:id", labReportController.updateLabReport);

// ✅ Delete lab report by ID
router.delete("/delete/:id", labReportController.deleteLabReport);

// ✅ Check lab report status by reference number
router.get("/check/:referenceNumber", labReportController.checkLabReportStatus);

// ✅ Get today’s lab reports count
router.get("/count-today", labReportController.getTodayLabReportsCount);

module.exports = router;





