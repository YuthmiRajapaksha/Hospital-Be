// const db = require("../config/db");

// Search doctors with availability
// exports.searchDoctors = async (req, res) => {
//   const { name, specialization, hospital, date } = req.query;

//   try {
//     let query = `
//       SELECT d.*, a.session_date, a.session_time, a.hospital AS appointment_hospital
//       FROM doctors d
//       LEFT JOIN appointments a ON d.id = a.doctor_id
//       WHERE 1=1
//     `;
//     const params = [];

//     if (name) {
//       query += " AND d.name LIKE ?";
//       params.push(`%${name}%`);
//     }
//     if (specialization) {
//       query += " AND d.specialization LIKE ?";
//       params.push(`%${specialization}%`);
//     }
//     if (hospital) {
//       query += " AND a.hospital LIKE ?";
//       params.push(`%${hospital}%`);
//     }
//     if (date) {
//       query += " AND DATE(a.session_date) = ?";
//       params.push(date);
//     }

//     const [rows] = await db.query(query, params);
//     res.json({ doctors: rows });
//   } catch (err) {
//     console.error("Doctor search error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const db = require("../config/db");

// // 🔍 Search doctors by name, specialization, hospital, date (any combination)
// const searchDoctors = async (req, res) => {
//   const { name, specialization, hospital, date } = req.query;

//   try {
//     let query = `
//       SELECT d.*, a.session_date, a.session_time, a.hospital AS appointment_hospital
//       FROM doctors d
//       LEFT JOIN appointments a ON d.id = a.doctor_id
      
//     `;
    
//     res.status(200).json({ doctors: rows }); // ✅ Always return 200, even if rows is empty
//   } catch (err) {
//     console.error("Doctor search error:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// module.exports = {
//   searchDoctors,
// };

// const db = require("../config/db");

// const searchDoctors = async (req, res) => {
//   const { name, specialization, hospital, date } = req.query;

//   try {
//     let query = `
//       SELECT d.id, d.name, d.specialization, d.photo,
//              a.hospital, a.session_date, a.session_time
//       FROM doctors d
//       LEFT JOIN appointments a ON d.id = a.doctor_id
//       WHERE 1=1
//     `;

//     const params = [];

//     if (name) {
//       query += " AND d.name LIKE ?";
//       params.push(`%${name}%`);
//     }
//     if (specialization) {
//       query += " AND d.specialization LIKE ?";
//       params.push(`%${specialization}%`);
//     }
//     if (hospital) {
//       query += " AND a.hospital = ?";
//       params.push(hospital);
//     }
//     if (date) {
//       query += " AND a.session_date = ?";
//       params.push(date);
//     }

//     query += " ORDER BY d.id, a.session_date, a.session_time";

//     const [rows] = await db.query(query, params);

//     // Group appointments by doctor
//     const doctorsMap = new Map();

//     rows.forEach((row) => {
//       if (!doctorsMap.has(row.id)) {
//         doctorsMap.set(row.id, {
//           id: row.id,
//           name: row.name,
//           specialization: row.specialization,
//           photo: row.photo,
//           appointments: [],
//         });
//       }
//       if (row.hospital) {
//         doctorsMap.get(row.id).appointments.push({
//           hospital: row.hospital,
//           session_date: row.session_date,
//           session_time: row.session_time,
//         });
//       }
//     });

//     const doctors = Array.from(doctorsMap.values());

//     res.status(200).json({ doctors });
//   } catch (err) {
//     console.error("Doctor search error:", err);
//     res.status(500).json({ message: "Database error" });
//   }
// };

// module.exports = { searchDoctors };


const db = require("../config/db");

// Search doctors with AND filtering and group their appointments
const searchDoctors = async (req, res) => {
  const { name, specialization, hospital, date } = req.query;

  try {
    let query = `
      SELECT d.id, d.name, d.specialization, d.photo,
             a.hospital, a.session_date, a.session_time
      FROM doctors d
      LEFT JOIN appointments a ON d.id = a.doctor_id
      WHERE 1=1
    `;
    const params = [];

    if (name) {
      query += " AND d.name LIKE ?";
      params.push(`%${name}%`);
    }
    if (specialization) {
      query += " AND d.specialization LIKE ?";
      params.push(`%${specialization}%`);
    }
    if (hospital) {
      query += " AND a.hospital LIKE ?";
      params.push(`%${hospital}%`);
    }
    if (date) {
      query += " AND DATE(a.session_date) = ?";
      params.push(date);
    }

    query += " ORDER BY d.id, a.session_date, a.session_time";

    const [rows] = await db.query(query, params);

    // Group rows into doctors with appointments
    const doctorMap = new Map();
    rows.forEach((row) => {
      if (!doctorMap.has(row.id)) {
        doctorMap.set(row.id, {
          id: row.id,
          name: row.name,
          specialization: row.specialization,
          photo: row.photo,
          appointments: [],
        });
      }

      if (row.hospital) {
        doctorMap.get(row.id).appointments.push({
          hospital: row.hospital,
          session_date: row.session_date,
          session_time: row.session_time,
        });
      }
    });

    const doctors = Array.from(doctorMap.values());
    res.status(200).json({ doctors }); // ✅ Always respond 200 with array
  } catch (err) {
    console.error("Doctor search error:", err);
    res.status(500).json({ message: "Database error" });
  }
};


module.exports = {
  searchDoctors,
};



