const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const csurf = require('csurf')

const csurfProtection = csurf({
  cookie: true
})

const { router: token } = require('./routes/tokens')
const user = require('./routes/users')
const taskBoards = require('./routes/taskBoards')

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(csurfProtection)
app.use(express.json())

app.use('/api/users', user)
app.use('/api/taskboards', taskBoards)
app.use('/api/auth', token)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(3001, () => {
  console.log(`Server listening on port 3001`)
})
