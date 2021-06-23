require('dotenv').config()

const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const authorizeUser = require('../middlewares/authorize')
const { signToken } = require('./tokens')

let router = express.Router()

router.get('/', (req, res) => {
  let rawData = fs.readFileSync(__dirname + '/storedUsers.json')
  let users = JSON.parse(rawData)
  const usersRes = users.map(({ id, email, loggedin }) => ({ id, email, loggedin }))

  res.status(200).json(usersRes)
})

router.post('/signup', (req, res) => {
  const { email, password } = req.body
  // TODO: validate input

  let rawData = fs.readFileSync(__dirname + '/storedUsers.json')
  let users = JSON.parse(rawData)
  
  let registeredEmail = users.find(user => user.email === email)
  if (registeredEmail) {
    res.status(400).json({ error: 'Email is already in use!' })
  }
  else {
    const newId = users.reduce((maxId, user) => user.id > maxId ? user.id : maxId, 0) + 1

    bcrypt.hash(password, 10, (err, hash) => {
      const newUser = {
        id: newId,
        email,
        password: hash,
        loggedin: false
      }
      users.push(newUser)
      fs.writeFileSync(__dirname + '/storedUsers.json', JSON.stringify(users))
      res.status(200).json(newUser)
    })
  }
})

router.post('/login', (req, res) => {
  let rawData = fs.readFileSync(__dirname + '/storedUsers.json')
  let users = JSON.parse(rawData)

  const { email, password } = req.body
  let user = users.find(user => user.email === email)
  if (!user) {
    res.status(401).json({ error: 'User not found!' })
  }
  else {
    bcrypt.compare(password, user.password, function(err, result) {
      if (!result) {
        res.status(401).json({ error: 'Incorrect password!' })
      }
      else {
        users = users.map(usr => usr.id === user.id ? { ...usr, loggedin: true } : usr)
        fs.writeFileSync(__dirname + '/storedUsers.json', JSON.stringify(users))

        const userRes = (({ id, email, loggedin }) => ({ id, email, loggedin: !loggedin }))(user)

        const accessToken = signToken(userRes)
        res.cookie(
          'token',
          accessToken,
          {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000,
          })
        res.status(200).json({ success: "User sucessfully logged in!", id: userRes.id })
      }
    })
  }
})

router.post('/logout', authorizeUser, (req, res) => {
  let rawData = fs.readFileSync(__dirname + '/storedUsers.json')
  let users = JSON.parse(rawData)

  const userId = req.userId
  let user = users.find(user => user.id === userId)
  if (!user) {
    res.status(404).json({ error: 'User not found!' })
  }
  else {
    users = users.map(usr => usr.id === user.id ? { ...usr, loggedin: false } : usr)
    fs.writeFileSync(__dirname + '/storedUsers.json', JSON.stringify(users))

    const logoutRes = { message: 'Logged out successfully' }
    res.clearCookie('token')
    res.status(200).json(logoutRes)
  }
})

module.exports = router
