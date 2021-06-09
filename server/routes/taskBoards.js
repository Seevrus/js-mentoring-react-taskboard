const express = require('express')
const fs = require('fs')

const router = express.Router()

router.post('/', (req, res) => {
  const { userId } = req.body

  const rawData = fs.readFileSync(__dirname + '/storedTaskBoards.json')
  const allTaskBoards = JSON.parse(rawData)

  const taskBoardsRes = allTaskBoards.filter(
    taskboard => taskboard.userIds.includes(userId)
  )

  res.status(200).json(taskBoardsRes)
})

module.exports = router
