//workinggggggggggggggggggggggggggggggggggggggggggggggg
// const db = require('../config/db');

// // Add a Doctor
// const addDoctor = (req, res) => {
//   console.log("📩 Received Doctor Data:", req.body); // ✅ Debug incoming data
//   const { name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password } = req.body;

//   // Check if all required fields are provided
//   if (!name || !specialization || !userName || !password) {
//     return res.status(400).json({ message: 'Name, Specialization, Username, and Password are required!' });
//   }

//   const query = `
//     INSERT INTO doctors (name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;
  
//   const values = [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting doctor:', err);
//       return res.status(500).json({ message: 'Database error', error: err });
//     }
//     console.log("📩 Received Doctor Data:", req.body); // ✅ Debug incoming data
//     res.status(201).json({ message: 'Doctor added successfully', doctorId: result.insertId });
//   });
// };

// // Get All Doctors
// const getDoctors = (req, res) => {
//   const query = 'SELECT * FROM doctors';
  
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching doctors:', err);
//       return res.status(500).json({ message: 'Database error', error: err });
//     }
//     res.status(200).json({ doctors: results });
//   });
// };

// // Get Doctor by ID
// const getDoctorById = (req, res) => {
//   const { id } = req.params;
  
//   const query = 'SELECT * FROM doctors WHERE id = ?';
  
//   db.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching doctor:', err);
//       return res.status(500).json({ message: 'Database error', error: err });
//     }
    
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }
    
//     res.status(200).json({ doctor: results[0] });
//   });
// };

// // Export the controller functions
// module.exports = { addDoctor, getDoctors, getDoctorById };


const db = require('../config/db');  // Assuming you have set up the database connection properly

// Add a Doctor
const addDoctor = (req, res) => {
  console.log("📩 Received Doctor Data:", req.body); // ✅ Debug incoming data
  const { name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password } = req.body;

  // Check if all required fields are provided
  if (!name || !specialization || !userName || !password) {
    return res.status(400).json({ message: 'Name, Specialization, Username, and Password are required!' });
  }

  const query = `
    INSERT INTO doctors (name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting doctor:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    console.log("📩 Received Doctor Data:", req.body); // ✅ Debug incoming data
    res.status(201).json({ message: 'Doctor added successfully', doctorId: result.insertId });
  });
};

// Get All Doctors
const getDoctors = (req, res) => {
  const query = 'SELECT * FROM doctors';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json({ doctors: results });
  });
};

// Get Doctor by ID
const getDoctorById = (req, res) => {
  const { id } = req.params;
  
  const query = 'SELECT * FROM doctors WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching doctor:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.status(200).json({ doctor: results[0] });
  });
};

// Update a Doctor by ID
const updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password } = req.body;

  // Check if all required fields are provided
  if (!name || !specialization || !userName || !password) {
    return res.status(400).json({ message: 'Name, Specialization, Username, and Password are required!' });
  }

  const query = `
    UPDATE doctors 
    SET name = ?, specialization = ?, workExperience = ?, qualifications = ?, address = ?, email = ?, contactNumber = ?, userName = ?, password = ? 
    WHERE id = ?
  `;
  
  const values = [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating doctor:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.status(200).json({ message: 'Doctor updated successfully' });
  });
};

// Delete a Doctor by ID
const deleteDoctor = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM doctors WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting doctor:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
};

// Export the controller functions
module.exports = {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};






// const addDoctor = (req, res) => {
//   const { name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password } = req.body;

//   if (!name || !specialization || !userName || !password) {
//     console.log("❌ Missing fields:", req.body); // ✅ Debugging log
//     return res.status(400).json({ message: "Name, Specialization, Username, and Password are required!" });
//   }

//   const query = `INSERT INTO doctors (name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(query, [name, specialization, workExperience, qualifications, address, email, contactNumber, userName, password], (err, result) => {
//     if (err) {
//       console.error("❌ Database Error:", err); // ✅ Debugging log
//       return res.status(500).json({ message: "Database error", error: err });
//     }
//     res.status(201).json({ message: "Doctor added successfully", doctorId: result.insertId });
//   });
// };

