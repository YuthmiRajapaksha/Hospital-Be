// const db = require('../config/db');

// // Controller function to book appointment
// exports.bookAppointment = (req, res) => {
//      console.log("Received appointment data:", req.body);  // <-- Add this line
//  const { doctorId, session, patientName, phone, country, nic, email } = req.body;

// if (!doctorId || !session || !patientName || !phone || !country || !nic || !email) {
//   return res.status(400).json({ error: "❌ All fields are required." });
// }

// const sessionFormatted = session.replace("T", " ").slice(0, 19);

// const query = `
//   INSERT INTO appointments 
//   (doctor_id, session, patient_name, phone, country, nic, email)
//   VALUES (?, ?, ?, ?, ?, ?, ?)
// `;

// const values = [doctorId, sessionFormatted, patientName, phone, country, nic, email];

// db.query(query, values, (err, results) => {
//   if (err) {
//     console.error("❌ Error booking appointment:", err.sqlMessage || err.message);
//     return res.status(500).json({ error: "❌ Database error" });
//   }
//   res.status(201).json({ message: "✅ Appointment booked successfully" });
// });
// };


const db = require('../config/db');

exports.bookAppointment = (req, res) => {
  const { doctorId, session, patientName, phone, country, nic, email } = req.body;

  if (!doctorId || !session || !patientName || !phone || !country || !nic || !email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sessionFormatted = session.replace("T", " ").slice(0, 19);

  const query = `
    INSERT INTO appointments 
    (doctor_id, date, patient_name, phone, country, nic, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [doctorId, sessionFormatted, patientName, phone, country, nic, email];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("❌ Error booking appointment:", err.sqlMessage || err.message);
      return res.status(500).json({ error: err.sqlMessage || "Database error" });
    }
    res.status(201).json({ message: "✅ Appointment booked successfully" });
  });
};


