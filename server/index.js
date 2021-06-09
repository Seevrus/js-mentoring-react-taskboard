const express = require('express')
const cors = require('cors')

const user = require('./routes/users')
const taskBoards = require('./routes/taskBoards')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', user)
app.use('/api/taskboards', taskBoards)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(3001, () => {
  console.log(`Server listening on port 3001`)
})
