const express = require('express')
const fs = require('fs')
const authorizeUser = require('../middlewares/authorize')

const router = express.Router()
router.use(authorizeUser)

/**
 * Get all tasks on a specific board
 */
router.get('/:boardId', (req, res) => {
  const rawData = fs.readFileSync(__dirname + '/storedTasks.json')
  const allTasks = JSON.parse(rawData)

  const { boardId } = req.params
  const filteredTasks = allTasks.filter(task => task.boardId === Number(boardId))

  res.status(200).json(filteredTasks)
})

/**
 * Store a task
 */
router.post('/', (req, res) => {
  const rawData = fs.readFileSync(__dirname + '/storedTasks.json')
  const allTasks = JSON.parse(rawData)

  const newTaskId = allTasks.reduce((maxId, task) => 
    (task.id > maxId ? maxId = task.id : maxId), 0
  ) + 1

  const boardId = req.body.boardId
  const text = req.body.text
  // TODO: validate input

  const newTask = {
    id: newTaskId,
    boardId,
    text,
    status: "todo"
  }

  allTasks.push(newTask)
  fs.writeFileSync(__dirname + '/storedTasks.json', JSON.stringify(allTasks))
  res.status(200).json(newTask)
})

/**
 * Delete a task
 */
 router.delete('/:boardId-:taskId', (req, res) => {
  const rawData = fs.readFileSync(__dirname + '/storedTasks.json')
  const allTasks = JSON.parse(rawData)

  const { boardId, taskId } = req.params
  const remaining = allTasks.filter(task => task.id !== Number(taskId))

  fs.writeFileSync(__dirname + '/storedTasks.json', JSON.stringify(remaining))
  res.status(200).json(remaining.filter(task => task.boardId === Number(boardId)))
})

/**
 * Delete all tasks
 */
router.delete('/all/:boardId', (req, res) => {
  const rawData = fs.readFileSync(__dirname + '/storedTasks.json')
  const allTasks = JSON.parse(rawData)

  const { boardId } = req.params
  const tasksToDelete = allTasks.filter(task => task.boardId === Number(boardId))
  const remaining = allTasks.filter(task => task.boardId !== Number(boardId))

  fs.writeFileSync(__dirname + '/storedTasks.json', JSON.stringify(remaining))
  res.status(200).json(tasksToDelete)
})

/**
 * Update task status
 */
router.post('/update', (req, res) => {
  const rawData = fs.readFileSync(__dirname + '/storedTasks.json')
  const allTasks = JSON.parse(rawData)

  const id = req.body.id
  const boardId = req.body.boardId
  const newStatus = req.body.status
  // TODO: validate input

  const newTasks = allTasks.map(task => 
    task.id === id 
    ? { ...task, status: newStatus } 
    : task
  )

  fs.writeFileSync(__dirname + '/storedTasks.json', JSON.stringify(newTasks))
  res.status(200).json(newTasks.filter(task => task.boardId === boardId))
})

module.exports = router
