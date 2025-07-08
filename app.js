require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./config/db'); 
const authRoutes = require('./routes/auth'); 
const path = require('path');


const labReportsRoutes = require("./routes/labReportsRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const registerRoutes = require('./routes/registerRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const createPaymentIntent = require("./routes/createPaymentIntent");
const bookingFormRoutes = require("./routes/bookingFormRoutes");
const doctorSearchRoutes = require("./routes/doctorSearchRoutes");
const authenticateToken =require ("./middleware/authenticateToken");
const auth = require ("./routes/auth");
const sessionRoutes = require("./routes/session");

app.use(cors());
app.use(bodyParser.json());


const stripe = require('stripe')('your_secret_key');

app.use("/api/lab-reports", labReportsRoutes);

app.use("/api/doctors", doctorRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/login', registerRoutes);

app.use('/api/register', registerRoutes);

app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});

app.use('/api', registerRoutes);

app.use("/api/sessions", sessionRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/appointments", appointmentsRoutes);

app.use("/", appointmentsRoutes);

app.use("/api", createPaymentIntent);

app.use('/api/bookingForm', bookingFormRoutes); 

app.use("/api/doctors", doctorSearchRoutes);

app.use("/api/bookingform", doctorSearchRoutes);




app.use("/api/create-payment-intent", createPaymentIntent);

app.get("/api/search", async (req, res) => {
  const { doctor, specialization, hospital, date } = req.query;

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

  try {
    const [rows] = await db.execute(query, params);
    res.json({ doctors: rows });
  } catch (error) {
    console.error("Search query failed:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/api/doctor-appointments', (req, res) => {
  const query = `
    SELECT a.id, a.date, a.patient_name, a.phone, a.country, a.nic, a.email, d.name AS doctor_name, d.specialization
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    ORDER BY d.name, a.date;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching doctor appointments:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});




app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
