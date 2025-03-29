// const db = require('../config/db');

// // Add a new lab report
// const addLabReport = (req, res) => {
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   // Validate input
//   if (!reference_number || !patient_name || !test_name || !report_date || !status) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   // Insert lab report into database
//   const query = `
//     INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
//     if (err) {
//       console.error('❌ Error inserting lab report:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.status(201).json({
//       message: '✅ Lab report added successfully!',
//       labReportId: result.insertId,
//     });
//   });
// };

// module.exports = { addLabReport };




//workinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
// const db = require('../config/db');  // Database connection

// // Add Lab Report function
// const addLabReport = (req, res) => {
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   const query = `
//     INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) 
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
//     if (err) {
//       console.error('Error inserting lab report:', err);
//       return res.status(500).json({ message: 'Database error', error: err });
//     }
//     res.status(201).json({ message: 'Lab report added successfully', result });
//   });
// };

// module.exports = { addLabReport };





//working 2
// const { v4: uuidv4 } = require("uuid"); // Import UUID for unique reference numbers
// const db = require("../config/db"); // Database connection

// // Add Lab Report function
// const addLabReport = (req, res) => {
//   let { reference_number, patient_name, test_name, report_date, status } = req.body;

//   // Ensure required fields are present
//   if (!patient_name || !test_name || !report_date || !status) {
//     return res.status(400).json({ message: "All fields are required!" });
//   }

//   // Generate a unique reference number if not provided
//   if (!reference_number) {
//     reference_number = `REF-${uuidv4()}`;
//   }

//   const query = `
//     INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) 
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
//     if (err) {
//       console.error("Error inserting lab report:", err);
//       return res.status(500).json({ message: "Database error", error: err });
//     }
//     res.status(201).json({ 
//       message: "Lab report added successfully", 
//       reference_number,
//       result 
//     });
//   });
// };

// module.exports = { addLabReport };



const db = require("../config/db");

// Check Lab Report Status Function
const checkLabReportStatus = (req, res) => {
  const { referenceNumber } = req.params;

  const query = "SELECT status FROM lab_reports WHERE reference_number = ?";

  db.query(query, [referenceNumber], (err, results) => {
    if (err) {
      console.error("Error fetching lab report status:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Lab report not found" });
    }

    res.status(200).json({ status: results[0].status });
  });
};

// Add Lab Report Function
const addLabReport = (req, res) => {
  let { reference_number, patient_name, test_name, report_date, status } = req.body;

  // Ensure required fields are present
  if (!patient_name || !test_name || !report_date || !status) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Generate a unique reference number if not provided
  if (!reference_number) {
    reference_number = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  const query = `
    INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
    if (err) {
      console.error("Error inserting lab report:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(201).json({ 
      message: "Lab report added successfully", 
      reference_number,
      result 
    });
  });
};

module.exports = { checkLabReportStatus, addLabReport };


