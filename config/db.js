// // db.js
// const mysql = require('mysql2');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   // user: 'your_username',
//   // password: 'your_password',
//   database: 'hospital_db'
// });

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database!');
// });

// module.exports = connection;

// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config({ path: './config.env' });

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('✅ Connected to hospital_db!');
// });

// module.exports = connection;


// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: 'localhost',      // Or the host of your database
//   user: 'root',           // Your MySQL username
//   password: '',           // Your MySQL password
//   database: 'hospital_db',   // Your database name
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }else {
//   console.log('Connected to the MySQL database');
// }
// });

// db.on('error', (err) => {
//   console.error('❗ MySQL error:', err);
//   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//     connectDB(); // Reconnect on disconnect
//   } else {
//     throw err;
//   }
// });


// connectDB();
// module.exports = db;

// const connectDB = () => {
//   db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Connected to the MySQL database');
//   });
// };

// module.exports = { db, connectDB };




// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'hospital_db'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database');
// });

// // Export the db connection
// module.exports = db;




//workingggggggggggggggggggggggggggggggggggggggggggggg
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Update if necessary
  password: '',      // Update if necessary
  database: 'hospital_db',
  // waitForConnections: true,
  // connectionLimit: 10, // Set a limit on simultaneous connections
  // queueLimit: 0 // Ensure you're using the correct database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to hospital_db database.');
  }
});

// Ensure the lab_reports table exists
const ensureLabReportsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS lab_reports (
      id INT AUTO_INCREMENT PRIMARY KEY,
      reference_number VARCHAR(255) NOT NULL,
      patient_name VARCHAR(255) NOT NULL,
      test_name VARCHAR(255) NOT NULL,
      report_date DATE NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `;

  db.query(query, (err) => {
    if (err) {
      console.error('Error creating lab_reports table:', err);
    } else {
      console.log('Table "lab_reports" ensured.');
    }
  });
};

// Call the function on startup
ensureLabReportsTable();

// Ensure the doctors table exists
const ensureDoctorsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS doctors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      specialization VARCHAR(255) NOT NULL,
      workExperience VARCHAR(255),
      qualifications TEXT,
      address TEXT,
      email VARCHAR(255),
      contactNumber VARCHAR(15),
      userName VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  db.query(query, (err) => {
    if (err) {
      console.error('Error creating doctors table:', err);
    } else {
      console.log('Table "doctors" ensured.');
    }
  });
};

// Call the function on startup to ensure the doctors table exists
ensureDoctorsTable();



 
module.exports = db;





// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const app = express();

// // Create a connection to the database
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',      // Update if necessary
//   password: '',      // Update if necessary
//   database: 'hospital_db' // Ensure you're using the correct database
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Connected to hospital_db database.');
//   }
// });

// // Ensure the doctors table exists
// const ensureDoctorsTable = () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS doctors (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       specialization VARCHAR(255) NOT NULL,
//       workExperience VARCHAR(255),
//       qualifications TEXT,
//       address TEXT,
//       email VARCHAR(255),
//       contactNumber VARCHAR(15),
//       userName VARCHAR(255) NOT NULL,
//       password VARCHAR(255) NOT NULL
//     );
//   `;

//   db.query(query, (err) => {
//     if (err) {
//       console.error('Error creating doctors table:', err);
//     } else {
//       console.log('Table "doctors" ensured.');
//     }
//   });
// };

// // Ensure the specializations table exists
// const ensureSpecializationsTable = () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS specializations (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL
//     );
//   `;

//   db.query(query, (err) => {
//     if (err) {
//       console.error('Error creating specializations table:', err);
//     } else {
//       console.log('Table "specializations" ensured.');
//     }
//   });
// };

// // Ensure the lab_reports table exists
// const ensureLabReportsTable = () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS lab_reports (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       reference_number VARCHAR(255) NOT NULL,
//       patient_name VARCHAR(255) NOT NULL,
//       test_name VARCHAR(255) NOT NULL,
//       report_date DATE NOT NULL,
//       status VARCHAR(50) NOT NULL
//     );
//   `;

//   db.query(query, (err) => {
//     if (err) {
//       console.error('Error creating lab_reports table:', err);
//     } else {
//       console.log('Table "lab_reports" ensured.');
//     }
//   });
// };

// // Call the function on startup to ensure the doctors, specializations, and lab_reports tables exist
// ensureDoctorsTable();
// ensureSpecializationsTable();
// ensureLabReportsTable();

// // Use middleware
// app.use(cors());          // Enable CORS for cross-origin requests
// app.use(express.json()); // Middleware to parse JSON requests

// // Doctors Route
// app.get("/api/doctors", (req, res) => {
//   const { specialization } = req.query;

//   let query = "SELECT * FROM doctors";
//   if (specialization) {
//     query += ` WHERE specialization = ?`;
//   }

//   db.query(query, [specialization], (err, results) => {
//     if (err) {
//       console.error("Error fetching doctors:", err);
//       return res.status(500).json({ error: "An error occurred while fetching doctors." });
//     }
    
//     res.json({ doctors: results });
//   });
// });

// // Specializations Route
// app.get("/api/specializations", (req, res) => {
//   const query = "SELECT DISTINCT specialization FROM doctors";
  
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching specializations:", err);
//       return res.status(500).json({ error: "An error occurred while fetching specializations." });
//     }
    
//     const specializations = results.map(row => row.specialization);
//     res.json({ specializations });
//   });
// });

// // Lab Reports Route
// app.get("/api/lab-reports", (req, res) => {
//   const { patient_name, reference_number, status } = req.query;

//   let query = "SELECT * FROM lab_reports";
//   let queryParams = [];

//   // Build query based on filters
//   if (patient_name) {
//     query += " WHERE patient_name = ?";
//     queryParams.push(patient_name);
//   }

//   if (reference_number) {
//     if (queryParams.length) query += " AND";
//     else query += " WHERE";
//     query += " reference_number = ?";
//     queryParams.push(reference_number);
//   }

//   if (status) {
//     if (queryParams.length) query += " AND";
//     else query += " WHERE";
//     query += " status = ?";
//     queryParams.push(status);
//   }

//   db.query(query, queryParams, (err, results) => {
//     if (err) {
//       console.error("Error fetching lab reports:", err);
//       return res.status(500).json({ error: "An error occurred while fetching lab reports." });
//     }
    
//     res.json({ lab_reports: results });
//   });
// });

// // Lab Reports POST Route (for creating a new report)
// app.post("/api/lab-reports", (req, res) => {
//   const { reference_number, patient_name, test_name, report_date, status } = req.body;

//   const query = `
//     INSERT INTO lab_reports (reference_number, patient_name, test_name, report_date, status)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [reference_number, patient_name, test_name, report_date, status], (err, results) => {
//     if (err) {
//       console.error("Error inserting lab report:", err);
//       return res.status(500).json({ error: "An error occurred while inserting the lab report." });
//     }
    
//     res.status(201).json({ message: "Lab report created successfully!" });
//   });
// });

// // Start the server
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// module.exports = db;
