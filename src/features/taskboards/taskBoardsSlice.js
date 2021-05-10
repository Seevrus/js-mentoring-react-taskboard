/**
 
{
  ids: [],
  entities: [
    {
      id:
      userIds: [<userId>, <userId>, ...]
      taskIds: [<taskId>, <taskId>, ...]
    },
    ...
  ]
}

 */

import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const taskBoardsAdapter = createEntityAdapter()
const initialState = taskBoardsAdapter.getInitialState()

const taskBoardsSlice = createSlice({
  name: 'taskBoards',
  initialState,
  reducers: {
    addBoard: taskBoardsAdapter.addOne,
    addTask: (state, action) => {
      const { boardId, taskId } = action.payload
      const board = state.entities[boardId]
      if (board) {
        board.taskIds.push(taskId)
      }
    },
    addUser: (state, action) => {
      const { boardId, userId } = action.payload
      const board = state.entities[boardId]
      if (board) {
        board.userIds.push(userId)
      }
    },
    removeBoard: taskBoardsAdapter.removeOne,
    removeUser: (state, action) => {
      const { boardId, userId } = action.payload
      const board = state.entities[boardId]
      if (board) {
        board.userIds = board.userIds.filter(id => id !== userId)
      }
    },
    removeTask: (state, action) => {
      const { boardId, taskId } = action.payload
      const board = state.entities[boardId]
      if (board) {
        board.taskIds = board.taskIds.filter(id => id !== taskId)
      }
    }
  }
})

export const {
  selectAll: selectAllTaskBoards,
  selectById: selectTaskBoard,
} = taskBoardsAdapter.getSelectors(state => state.taskBoards)

export const selectAllTasksOnBoard = createSelector(
  selectTaskBoard,
  taskBoard => taskBoard.taskIds
)

export const selectAllTaskBoardsByUserId = createSelector(
  selectAllTaskBoards,
  state => state.filters,
  (taskBoards, filters) => {
    const userId = filters.currentUser;
    return taskBoards.filter(board => board.userIds.includes(userId))
  }
)

export const { 
  addBoard,
  addTask,
  addUser, 
  removeBoard, 
  removeUser, 
  removeTask 
} = taskBoardsSlice.actions

export const getMaxId = createSelector(
  selectAllTaskBoards,
  taskBoards => taskBoards.reduce((board, maxId) => board.id > maxId ? board.id : maxId, -1).id
)

export default taskBoardsSlice.reducer
