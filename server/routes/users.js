const express = require('express')
const fs = require('fs')

let router = express.Router()

router.get('/', (req, res) => {
  let rawData = fs.readFileSync(__dirname + '/storedUsers.json')
  let users = JSON.parse(rawData)
  res.status(200).json(users)
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  // TODO: validate input

  let rawData = fs.readFileSync(__dirname + '/storedUsers.json')
  let users = JSON.parse(rawData)
  
  let registeredEmail = users.find(user => user.email === email)
  if (registeredEmail) {
    res.status(400).json({ error: 'Email is already in use!' })
  }
  else {
    const newId = users.reduce((maxId, user) => user.id > maxId ? user.id : maxId, -1) + 1
    const newUser = {
      id: newId,
      email, password,
      loggedin: false
    }
    users.push(newUser)
    fs.writeFileSync(__dirname + '/storedUsers.json', JSON.stringify(users, null, 2))
    res.status(200).json(newUser)
  }
})

module.exports = router
