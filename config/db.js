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




const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Export the db connection
module.exports = db;
