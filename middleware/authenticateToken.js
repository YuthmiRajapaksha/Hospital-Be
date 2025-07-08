

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


// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized: Token missing" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

