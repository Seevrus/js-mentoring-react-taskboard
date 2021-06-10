/**
 
{
  ids: [],
  entities: [
    {
      id:
      boardId:
      text: "Task to do 1"
      status: "todo"
    },
    ...
  ]
}

 */

import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter()
const initialState = tasksAdapter.getInitialState()

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    removeAllTasksOnBoard: (state, action) => {
      const { boardId } = action.payload
      for (const taskId of state.ids) {
        if (state.entities[taskId].boardId === boardId) {
          tasksAdapter.removeOne(taskId)
        }
      }
    },
    removeTask: tasksAdapter.removeOne,
    updateTask: (state, action) => {
      const { id, status } = action.payload
      const existingTodo = state.entities[id]
      if (existingTodo) {
        existingTodo.status = status
      }
    },
  }
})

const { 
  selectAll: selectAllTasks,
} = tasksAdapter.getSelectors(state => state.tasks)

export const selectTasksByBoard = (state, boardId) => {
  const tasksOnBoard = []
  for (const taskId in state.tasks.entities) {
    const task = state.tasks.entities[taskId]
    if (task.boardId === boardId) {
      tasksOnBoard.push({ ...task })
    }
  }
  return tasksOnBoard
}

export const getMaxId = createSelector(
  selectAllTasks,
  tasks => tasks.reduce((task, maxId) => task.id > maxId ? task.id : maxId, -1).id
)

export const { 
  addTask,
  removeAllTasksOnBoard,
  removeTask,
  updateTask } = tasksSlice.actions

export default tasksSlice.reducer
