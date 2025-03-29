// // routes/labReports.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // Add Lab Report
// router.post('/add', (req, res) => {
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   const query = `
//     INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) 
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
//     if (err) {
//       console.error('Error inserting lab report:', err);
//       return res.status(500).send('Database error');
//     }
//     res.status(201).send('Lab report added successfully');
//   });
// });

// module.exports = router;

// router.post('/add', (req, res) => {
//     const { reference_number, patient_name, test_name, report_date, status } = req.body;
  
//     const query = `
//       INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status)
//       VALUES (?, ?, ?, ?, ?)
//     `;
  
//     db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
//       if (err) {
//         console.error('Error inserting lab report:', err);
//         return res.status(500).send('Database error');
//       }
//       res.status(201).send('Lab report added successfully');
//     });
//   });
 
// const express = require('express');
// const router = express.Router();
// const { addLabReport } = require('../controllers/labReportsController'); // Import the controller

// // Route to handle adding a lab report
// router.post('/add', addLabReport);

// module.exports = router;
// routes/labReportsRoutes.js






//currently working
// const express = require('express');
// const router = express.Router();


// router.post('/add', (req, res) => {
//   console.log('Received data:', req.body);
//   res.status(201).json({ message: 'Lab report added successfully' });
// });

// module.exports = router;







// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');  // Adjust path to your db config file

// router.post('/add', (req, res) => {
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   const query = `
//     INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) 
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
//     if (err) {
//       console.error('Error inserting lab report:', err);
//       return res.status(500).send('Database error');
//     }
//     console.log('Data inserted into MySQL:', result);
//     res.status(201).send('Lab report added successfully');
//   });
// });

// module.exports = router;




//workinggggggggggggggggggggggg

// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');  // Adjust path to your db config file
// const { checkLabReportStatus } = require("../controllers/labReportController");  



// // GET all lab reports
// router.get('/', (req, res) => {
//   const query = 'SELECT * FROM lab_reports';

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error retrieving lab reports:', err);
//       return res.status(500).send('Database error');
//     }

//     res.status(200).json(results);  // Send all lab reports as JSON
//   });
// });

// // GET a specific lab report by ID
// router.get('/:id', (req, res) => {
//   const { id } = req.params;

//   const query = 'SELECT * FROM lab_reports WHERE id = ?';

//   db.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error retrieving lab report:', err);
//       return res.status(500).send('Database error');
//     }

//     if (results.length === 0) {
//       return res.status(404).send('Lab report not found');
//     }

//     res.status(200).json(results[0]);  // Send the specific lab report as JSON
//   });
// });

// // Check lab report status
// router.get("/check/:referenceNumber", checkLabReportStatus);

// // Add a new lab report
// router.post('/add', (req, res) => {
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   const query = `
//     INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status) 
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, result) => {
//     if (err) {
//       console.error('Error inserting lab report:', err);
//       return res.status(500).send('Database error');
//     }
//     console.log('Data inserted into MySQL:', result);
//     res.status(201).send('Lab report added successfully');
//   });
// });




// // Update an existing lab report
// router.put('/update/:id', (req, res) => {
//   const { id } = req.params;  // Get the ID from the route parameter
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   const query = `
//     UPDATE lab_reports 
//     SET reference_number = ?, patient_name = ?, test_name = ?, report_date = ?, status = ? 
//     WHERE id = ?
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status, id], (err, result) => {
//     if (err) {
//       console.error('Error updating lab report:', err);
//       return res.status(500).send('Database error');
//     }

//     if (result.affectedRows === 0) {
//       // If no rows were affected, the ID might not exist
//       return res.status(404).send('Lab report not found');
//     }

//     console.log('Data updated in MySQL:', result);
//     res.status(200).send('Lab report updated successfully');
//   });
// });

// // DELETE a lab report
// router.delete('/delete/:id', (req, res) => {
//   const { id } = req.params;

//   const query = 'DELETE FROM lab_reports WHERE id = ?';

//   db.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error deleting lab report:', err);
//       return res.status(500).send('Database error');
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).send('Lab report not found');
//     }

//     console.log('Data deleted from MySQL:', result);
//     res.status(200).send('Lab report deleted successfully');
//   });
// });

// module.exports = router;






const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { checkLabReportStatus, addLabReport } = require("../controllers/labReportController");

// GET all lab reports
router.get("/", (req, res) => {
  const query = "SELECT * FROM lab_reports";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving lab reports:", err);
      return res.status(500).send("Database error");
    }

    res.status(200).json(results);
  });
});

// GET a specific lab report by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM lab_reports WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error retrieving lab report:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(404).send("Lab report not found");
    }

    res.status(200).json(results[0]);
  });
});

// Check lab report status
router.get("/check/:referenceNumber", checkLabReportStatus);

// Add a new lab report
router.post("/add", addLabReport);

// Update an existing lab report
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { reference_number, patient_name, test_name, report_date, status } = req.body;

  const query = `
    UPDATE lab_reports 
    SET reference_number = ?, patient_name = ?, test_name = ?, report_date = ?, status = ? 
    WHERE id = ?
  `;

  db.query(query, [reference_number, patient_name, test_name, report_date, status, id], (err, result) => {
    if (err) {
      console.error("Error updating lab report:", err);
      return res.status(500).send("Database error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Lab report not found");
    }

    console.log("Data updated in MySQL:", result);
    res.status(200).send("Lab report updated successfully");
  });
});

// DELETE a lab report
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM lab_reports WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting lab report:", err);
      return res.status(500).send("Database error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Lab report not found");
    }

    console.log("Data deleted from MySQL:", result);
    res.status(200).send("Lab report deleted successfully");
  });
});

module.exports = router;



  
