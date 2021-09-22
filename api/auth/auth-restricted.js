require("dotenv").config()
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || 'fan of the game'

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const formattedToken = token ? token.replace("Bearer", "").trim() : null;
  if (!formattedToken) {
    return next({ status: 401, message: "token required" });
  }
  jwt.verify(formattedToken, JWT_SECRET, (err, decodedToken) => {
    if (err) return next({ status: 401, message: "token invalid" });
    req.decodedToken = decodedToken;
    next();
  });
};

