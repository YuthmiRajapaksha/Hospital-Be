// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // Enable CORS for all origins (allows all cross-origin requests)
// app.use(cors());

// // If you want to allow only specific origins, you can use:
// app.use(cors({
//   origin: 'http://localhost:3001' // Allow only your frontend's origin
// }));

// // Example API route
// app.post('/api/lab-reports/add', (req, res) => {
//   // Handle your API logic here
// });

// // Other middleware, routes, etc.

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });




//workingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
// const express = require('express');
// const cors = require('cors');
// const labReportsRoutes = require('./routes/labReportsRoutes');  // Import the routes
//  const db = require('./config/db'); // Ensure this points to your MySQL connection file

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());  // Middleware to parse JSON bodies

// // Use the labReportsRoutes for routes starting with /api/lab-reports
// app.use('/api/lab-reports', labReportsRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');

// // Assuming labReportsRoutes is exported correctly from the routes file
// const labReportsRoutes = require('./routes/labReportsRoutes');

// const doctorRoutes = require('./routes/doctorRoutes');

// app.use(cors());
// app.use(bodyParser.json());  // Make sure the request body is parsed as JSON

// // Use the labReportsRoutes with a base path
// app.use('/api/lab-reports', labReportsRoutes);
// // Use the doctor routes
// app.use('/api/doctors', doctorRoutes);

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const labReportsRoutes = require("./routes/labReportsRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

app.use(cors());
app.use(bodyParser.json()); // To parse incoming JSON requests

// Use the labReportsRoutes with a base path
app.use("/api/lab-reports", labReportsRoutes);

// Use the doctor routes
app.use("/api/doctors", doctorRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
