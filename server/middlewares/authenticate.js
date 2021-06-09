const jwt = require("jsonwebtoken")
const config = require('../config')

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']

  let token
  if (authHeader) {
    token = authHeader.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: "You are not authorized to view this page!"
        })
      }
      else {
        const userId = decoded.id
        req.userId = userId
        next()
      }
    })
  }
  else {
    res.status(403).json({
      error: "You are not authorized to view this page!"
    })
  }
}

module.exports = authenticate
