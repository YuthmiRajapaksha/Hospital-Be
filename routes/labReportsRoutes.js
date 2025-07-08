

const express = require("express");
const router = express.Router();
const labReportController = require("../controllers/labReportController");

//  Get total lab reports count
router.get("/count", labReportController.getLabReportsTotalCount);

// Get all lab reports
router.get("/", labReportController.getAllReports);

//  Add new lab report
router.post("/add", labReportController.addLabReport);

// Update lab report by ID
router.put("/update/:id", labReportController.updateLabReport);

//  Delete lab report by ID
router.delete("/delete/:id", labReportController.deleteLabReport);

// Check lab report status by reference number
router.get("/check/:referenceNumber", labReportController.checkLabReportStatus);

// Get today’s lab reports count
router.get("/count-today", labReportController.getTodayLabReportsCount);

module.exports = router;





