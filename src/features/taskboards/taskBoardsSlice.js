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

export const { 
  addTask,
  addUser, 
  removeBoard, 
  removeUser, 
  removeTask 
} = taskBoardsSlice.actions

export default taskBoardsSlice.reducer
