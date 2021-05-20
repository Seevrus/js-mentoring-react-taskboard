const express = require('express')
const app = express()

const taskBoards = [
  { id: 1, name: "Board 1", userIds: [2, 3], taskIds: [1, 2, 3, 4, 5] },
]

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(3001, () => {
  console.log(`Server listening on port 3001`)
})
