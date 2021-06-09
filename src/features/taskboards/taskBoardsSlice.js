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

import { 
  createAsyncThunk, 
  createEntityAdapter, 
  createSelector, 
  createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const taskBoardsAdapter = createEntityAdapter()
const initialState = taskBoardsAdapter.getInitialState()

export const fetchTaskBoards = createAsyncThunk(
  'taskBoards/fetchTaskBoards',
  async () => {
    const response = await axios.get("http://localhost:3001/api/taskBoards")
    return response.data
  }
)

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
    removeAllBoards: taskBoardsAdapter.removeAll,
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
  },
  extraReducers: {
    [fetchTaskBoards.fulfilled]: taskBoardsAdapter.addMany,
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

// export const selectAllTaskBoardsByUserId = createSelector(
//   selectAllTaskBoards,
//   state => state.filters,
//   (taskBoards, filters) => {
//     const userId = filters.currentUser;
//     return taskBoards.filter(board => board.userIds.includes(userId))
//   }
// )

export const { 
  addBoard,
  addTask,
  addUser,
  removeAllBoards,
  removeBoard, 
  removeUser, 
  removeTask 
} = taskBoardsSlice.actions

export const getMaxId = createSelector(
  selectAllTaskBoards,
  taskBoards => taskBoards.reduce((board, maxId) => board.id > maxId ? board.id : maxId, -1).id
)

export default taskBoardsSlice.reducer
