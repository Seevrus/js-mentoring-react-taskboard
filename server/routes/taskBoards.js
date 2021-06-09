const express = require('express')
const fs = require('fs')
const authenticate = require('../middlewares/authenticate')

const router = express.Router()
router.use(authenticate)

router.get('/', (req, res) => {
  const userId = req.userId

  const rawData = fs.readFileSync(__dirname + '/storedTaskBoards.json')
  const allTaskBoards = JSON.parse(rawData)

  const taskBoardsRes = allTaskBoards.filter(
    taskboard => taskboard.userIds.includes(userId)
  )

  res.status(200).json(taskBoardsRes)
})

module.exports = router
