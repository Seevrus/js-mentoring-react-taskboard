const jwt = require("jsonwebtoken")

const authorizeUser = (req, res, next) => {
  const token = req.cookies.token

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
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

module.exports = authorizeUser
