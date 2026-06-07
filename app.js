// require("dotenv").config();

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const db = require('./config/db'); 
// const authRoutes = require('./routes/auth'); 
// const path = require('path');


// const labReportsRoutes = require("./routes/labReportsRoutes");
// const doctorRoutes = require("./routes/doctorRoutes");
// const registerRoutes = require('./routes/registerRoutes');
// const appointmentsRoutes = require('./routes/appointmentsRoutes');
// // const createPaymentIntent = require("./routes/createPaymentIntent");
// const bookingFormRoutes = require("./routes/bookingFormRoutes");
// const doctorSearchRoutes = require("./routes/doctorSearchRoutes");
// const authenticateToken =require ("./middleware/authenticateToken");
// const auth = require ("./routes/auth");
// const sessionRoutes = require("./routes/session");

// app.use(cors());
// app.use(bodyParser.json());


// // const stripe = require('stripe')('your_secret_key');

// app.use("/api/lab-reports", labReportsRoutes);

// app.use("/api/doctors", doctorRoutes);

// app.use('/api/auth', authRoutes);

// app.use('/api/login', registerRoutes);

// app.use('/api/register', registerRoutes);

// app.get("/api/profile", authenticateToken, (req, res) => {
//   res.json({ message: "This is your profile", user: req.user });
// });

// app.use('/api', registerRoutes);

// app.use("/api/sessions", sessionRoutes);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use("/api/appointments", appointmentsRoutes);

// // app.use("/", appointmentsRoutes);

// // app.use("/api", createPaymentIntent);

// app.use('/api/bookingForm', bookingFormRoutes); 

// app.use("/api", bookingFormRoutes);

// app.use("/api/doctors", doctorSearchRoutes);

// app.use("/api/bookingform", doctorSearchRoutes);




// // app.use("/api/create-payment-intent", createPaymentIntent);

// app.get("/api/search", async (req, res) => {
//   const { doctor, specialization, hospital, date } = req.query;

//   let query = "SELECT * FROM doctors WHERE 1=1";
//   let params = [];

//   if (doctor) {
//     query += " AND name LIKE ?";
//     params.push(`%${doctor}%`);
//   }
//   if (specialization) {
//     query += " AND specialization LIKE ?";
//     params.push(`%${specialization}%`);
//   }
//   if (hospital) {
//     query += " AND hospital LIKE ?";
//     params.push(`%${hospital}%`);
//   }

//   try {
//     const [rows] = await db.execute(query, params);
//     res.json({ doctors: rows });
//   } catch (error) {
//     console.error("Search query failed:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// // app.get('/api/doctor-appointments', (req, res) => {
// //   const query = `
// //     SELECT a.id, a.date, a.patient_name, a.phone, a.country, a.nic, a.email, d.name AS doctor_name, d.specialization
// //     FROM appointments a
// //     JOIN doctors d ON a.doctor_id = d.id
// //     ORDER BY d.name, a.date;
// //   `;

// //   db.query(query, (err, results) => {
// //     if (err) {
// //       console.error("Error fetching doctor appointments:", err);
// //       return res.status(500).json({ error: "Database error" });
// //     }
// //     res.json(results);
// //   });
// // });

// // app.get('/api/doctor-appointments', async (req, res) => {
// //   try {
// //     const query = `
// //       SELECT a.id, a.date, a.patient_name, a.phone, a.country, a.nic, a.email,
// //              d.name AS doctor_name, d.specialization
// //       FROM appointments a
// //       JOIN doctors d ON a.doctor_id = d.id
// //       ORDER BY d.name, a.date;
// //     `;

// //     const [results] = await db.query(query);
// //     res.json(results);
// //   } catch (err) {
// //     console.error("Error fetching doctor appointments:", err);
// //     res.status(500).json({ error: "Database error" });
// //   }
// // });

// // GET appointments for a specific doctor
// app.get("/api/appointments/doctor/:doctorId", async (req, res) => {
//   const { doctorId } = req.params;

//   try {
//     const query = `
//       SELECT a.id, a.appointment_number, a.patient_name, a.phone, a.country, a.nic, a.email,
//              a.hospital, a.session_date, a.session_time, a.status,
//              d.name AS doctor_name, d.specialization
//       FROM appointments a
//       JOIN doctors d ON a.doctor_id = d.id
//       WHERE d.id = ?
//       ORDER BY a.session_date, a.session_time;
//     `;

//     const [results] = await db.query(query, [doctorId]);

//     res.json(results); // this will send an array of appointments
//   } catch (err) {
//     console.error("Error fetching appointments for doctor:", err);
//     res.status(500).json({ error: "Database error" });
//   }
// });




// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });





require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// DB
const db = require("./config/db");

// Middlewares
const authenticateToken = require("./middleware/authenticateToken");

// Routes
const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctorRoutes");
const registerRoutes = require("./routes/registerRoutes");
const labReportsRoutes = require("./routes/labReportsRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const bookingFormRoutes = require("./routes/bookingFormRoutes");
const doctorSearchRoutes = require("./routes/doctorSearchRoutes");
const sessionRoutes = require("./routes/session");
const notificationRoutes = require("./routes/notificationRoutes");


app.use(cors());
app.use(express.json());

const sendPin = require("./routes/sendPin");
const otpVerify = require("./routes/otpVerify");



app.use("/api", sendPin);
app.use("/api", otpVerify);


// app.use(cors());
// app.use(bodyParser.json());

// Public uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// --------------------------------------------------
// ✅ AUTH ROUTES
// --------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/login", registerRoutes);
app.use("/api/register", registerRoutes);
app.use("/api", registerRoutes); // Contains login + register merged





// --------------------------------------------------
// ✅ PROFILE (Protected Route)
// --------------------------------------------------
app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});


// --------------------------------------------------
// ✅ DOCTOR ROUTES
// --------------------------------------------------
app.use("/api/doctors", doctorRoutes);       // doctor CRUD
app.use("/api/doctors", doctorSearchRoutes); // doctor search


// --------------------------------------------------
// ✅ LAB REPORT ROUTES
// --------------------------------------------------
app.use("/api/lab-reports", labReportsRoutes);


// --------------------------------------------------
// ✅ SESSION ROUTES
// --------------------------------------------------
app.use("/api/sessions", sessionRoutes);


// --------------------------------------------------
// ✅ APPOINTMENTS ROUTES
// --------------------------------------------------
app.use("/api/appointments", appointmentsRoutes);


// --------------------------------------------------
// ✅ BOOKING FORM ROUTES
// --------------------------------------------------
app.use("/api/bookingForm", bookingFormRoutes);
app.use("/api/bookingform", doctorSearchRoutes); // Search route for booking form



app.use("/api/notifications", notificationRoutes);


// --------------------------------------------------
// ✅ SEARCH DOCTOR (General Search Endpoint)
// --------------------------------------------------
app.get("/api/search", async (req, res) => {
  const { doctor, specialization, hospital } = req.query;

  let query = "SELECT * FROM doctors WHERE 1=1";
  let params = [];

  if (doctor) {
    query += " AND name LIKE ?";
    params.push(`%${doctor}%`);
  }
  if (specialization) {
    query += " AND specialization LIKE ?";
    params.push(`%${specialization}%`);
  }
  if (hospital) {
    query += " AND hospital LIKE ?";
    params.push(`%${hospital}%`);
  }

  // Cap the result set to avoid loading the whole doctors table into memory.
  query += " LIMIT 200";

  try {
    const [rows] = await db.execute(query, params);
    res.json({ doctors: rows });
  } catch (error) {
    console.error("Search query failed:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// --------------------------------------------------
// ✅ GET APPOINTMENTS FOR A SPECIFIC DOCTOR
// --------------------------------------------------
app.get("/api/appointments/doctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  try {
    const query = `
      SELECT a.id, a.appointment_number, a.patient_name, a.phone, a.country,
             a.nic, a.email, a.hospital, a.session_date, a.session_time, a.status,
             d.name AS doctor_name, d.specialization
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE d.id = ?
      ORDER BY a.session_date, a.session_time;
    `;

    const [results] = await db.query(query, [doctorId]);
    res.json(results);

  } catch (err) {
    console.error("Error fetching appointments for doctor:", err);
    res.status(500).json({ error: "Database error" });
  }
});


// --------------------------------------------------
// ✅ START SERVER
// --------------------------------------------------
// --------------------------------------------------
// ✅ 404 + ERROR HANDLER
// Without a final error handler, an exception thrown inside an async route
// (e.g. a ReferenceError) becomes an unhandled rejection and the request never
// gets a response — the socket/req/res objects linger, leaking memory under
// repeated calls. This catches sync errors and keeps responses bounded.
// --------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Server error" });
});

// Log (instead of crash) on stray async rejections so one bad request can't
// take the whole process down.
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason && reason.message ? reason.message : reason);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
