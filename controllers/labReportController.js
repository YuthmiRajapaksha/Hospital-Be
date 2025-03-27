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


const db = require('../config/db');  // Database connection

// Add Lab Report function
const addLabReport = (req, res) => {
  const { reference_number, patient_name, test_name, report_date, status } = req.body;

  const query = `
    INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
    if (err) {
      console.error('Error inserting lab report:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Lab report added successfully', result });
  });
};

module.exports = { addLabReport };
