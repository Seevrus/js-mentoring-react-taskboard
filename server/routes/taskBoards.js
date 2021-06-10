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
    taskBoard => taskBoard.userIds.includes(userId)
  )

  res.status(200).json(taskBoardsRes)
})

router.post('/', (req, res) => {
  const rawData = fs.readFileSync(__dirname + '/storedTaskBoards.json')
  const allTaskBoards = JSON.parse(rawData)

  const newBoardId = allTaskBoards.reduce((maxId, taskBoard) => 
    (taskBoard.id > maxId ? maxId = taskBoard.id : maxId), 0
  ) + 1

  const boardName = req.body.boardName

  const newBoard = {
    id: newBoardId,
    name: boardName,
    userIds: [req.userId]
  }

  allTaskBoards.push(newBoard)
  fs.writeFileSync(__dirname + '/storedTaskBoards.json', JSON.stringify(allTaskBoards))
  res.status(200).json(newBoard)
})

module.exports = router
