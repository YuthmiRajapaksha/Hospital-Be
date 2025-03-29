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



const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Update if necessary
  password: '',      // Update if necessary
  database: 'hospital_db' // Ensure you're using the correct database
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
