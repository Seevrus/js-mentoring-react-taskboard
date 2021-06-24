const express = require('express')
const jwt = require('jsonwebtoken')

const generateAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn:  '1h'})

const signToken = user => {
  const accessToken = generateAccessToken(user)
  const expiresIn = new Date()
  expiresIn.setHours(expiresIn.getHours() + 2)

  return accessToken
}

const router = express.Router()

router.get('/checkstatus', (req, res) => {
  const token = req.cookies.token

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(200).json({
          error: "You are currently not signed in!"
        })
      }
      else {
        const userId = decoded.id
        res.status(200).json({ success: "User is currently signed in", id: userId })
      }
    })
  }
  else {
    res.status(200).json({
      error: "You are currently not signed in!"
    })
  }
})

module.exports = { router, signToken }