// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "your_secret_key";

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Access denied, token missing" });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid or expired token" });

//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;


// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   jwt.verify(token, "YOUR_SECRET_KEY", (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user; // user info from payload
//     next();
//   });
// };

// module.exports = authenticateToken;


// middleware/authenticateToken.js
// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;



const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    // If token missing, optionally reject request or allow optional auth:
    // return res.status(401).json({ error: "Unauthorized: Token missing" });
    req.user = null; 
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });
    req.user = user; 
    next();
  });
};

module.exports = authenticateToken;




