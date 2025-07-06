// const db = require("../config/db");

// // Get all lab reports
// const getAllReports = async (req, res) => {
//   try {
//     const [results] = await db.query("SELECT * FROM lab_reports ORDER BY id DESC");
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Error getting reports:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// // Add a new lab report
// const addLabReport = async (req, res) => {
//   let { reference_number, patient_name, test_name, report_date, status } = req.body;

//   if (!patient_name || !test_name || !report_date || !status) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   if (!reference_number) {
//     reference_number = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
//   }

//   try {
//     await db.query(
//       `INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) VALUES (?, ?, ?, ?, ?)`,
//       [reference_number, patient_name, test_name, report_date, status]
//     );
//     res.status(201).json({ message: "Report added", reference_number });
//   } catch (err) {
//     console.error("Insert error:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// // Update an existing lab report
// const updateLabReport = async (req, res) => {
//   const { id } = req.params;
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   try {
//     const [result] = await db.query(
//       `UPDATE lab_reports SET reference_number = ?, patient_name = ?, test_name = ?, report_date = ?, status = ? WHERE id = ?`,
//       [reference_number, patient_name, test_name, report_date, status, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Lab report not found" });
//     }

//     res.status(200).json({ message: "Report updated" });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// // Delete a lab report
// const deleteLabReport = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [result] = await db.query("DELETE FROM lab_reports WHERE id = ?", [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Lab report not found" });
//     }

//     res.status(200).json({ message: "Report deleted" });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// // Check report status
// const checkLabReportStatus = async (req, res) => {
//   const { referenceNumber } = req.params;

//   try {
//     const [results] = await db.query("SELECT status FROM lab_reports WHERE reference_number = ?", [referenceNumber]);

//     if (results.length === 0) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     res.status(200).json({ status: results[0].status });
//   } catch (err) {
//     console.error("Status check error:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// const getTodayLabReportsCount = async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       `SELECT COUNT(*) AS count FROM lab_reports WHERE DATE(report_date) = CURDATE()`
//     );
//     res.json({ count: rows[0].count });
//   } catch (error) {
//     console.error("Error fetching today's lab reports count:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   getAllReports,
//   addLabReport,
//   updateLabReport,
//   deleteLabReport,
//   checkLabReportStatus,
//   getTodayLabReportsCount
// };


// controllers/labReportController.js

const db = require("../config/db");

// Get all lab reports
exports.getAllReports = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM lab_reports ORDER BY id DESC");
    res.status(200).json(results);
  } catch (err) {
    console.error("Error getting reports:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Add a new lab report
exports.addLabReport = async (req, res) => {
  let { reference_number, patient_name, test_name, report_date, status } = req.body;

  if (!patient_name || !test_name || !report_date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!reference_number) {
    reference_number = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  try {
    await db.query(
      `INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status)
       VALUES (?, ?, ?, ?, ?)`,
      [reference_number, patient_name, test_name, report_date, status]
    );
    res.status(201).json({ message: "Report added", reference_number });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Update an existing lab report
exports.updateLabReport = async (req, res) => {
  const { id } = req.params;
  const { reference_number, patient_name, test_name, report_date, status } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE lab_reports SET reference_number = ?, patient_name = ?, test_name = ?, report_date = ?, status = ? WHERE id = ?`,
      [reference_number, patient_name, test_name, report_date, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lab report not found" });
    }

    res.status(200).json({ message: "Report updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Delete a lab report
exports.deleteLabReport = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM lab_reports WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lab report not found" });
    }

    res.status(200).json({ message: "Report deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Check report status
exports.checkLabReportStatus = async (req, res) => {
  const { referenceNumber } = req.params;

  try {
    const [results] = await db.query(
      "SELECT status FROM lab_reports WHERE reference_number = ?",
      [referenceNumber]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ status: results[0].status });
  } catch (err) {
    console.error("Status check error:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Get today’s lab reports count
exports.getTodayLabReportsCount = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM lab_reports WHERE DATE(report_date) = CURDATE()`
    );
    res.json({ count: rows[0].count });
  } catch (err) {
    console.error("Error fetching today's lab reports count:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get total lab reports count
exports.getLabReportsTotalCount = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM lab_reports");
    const count = rows?.[0]?.count ?? 0;
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error retrieving lab reports count:", err);
    res.status(500).json({ message: "Database error" });
  }
};

