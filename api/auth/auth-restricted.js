require("dotenv").config()
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(400).json({ 
          message: "token invalid", 
          error: err.message, 
          stack: err.stack 
        })
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  } else {
    res.status(400).json("token required")
  }
}