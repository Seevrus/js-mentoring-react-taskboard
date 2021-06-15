/**
 
{
  ids: [],
  entities: [
    {
      id:
      name: "..."
      userIds: [<userId>, <userId>, ...]
    },
    ...
  ]
}

 */

import { 
  createAsyncThunk,
  createEntityAdapter, 
  createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const taskBoardsAdapter = createEntityAdapter()
const initialState = taskBoardsAdapter.getInitialState()

export const addBoard = createAsyncThunk(
  'taskBoards/addBoard',
  async boardName => {
    console.log(boardName)
    const response = await axios.post("http://localhost:3001/api/taskBoards", { boardName })
    return response.data
  }
)

export const fetchTaskBoards = createAsyncThunk(
  'taskBoards/fetchTaskBoards',
  async () => {
    const response = await axios.get("http://localhost:3001/api/taskBoards")
    return response.data
  }
)

export const removeBoard = createAsyncThunk(
  'taskBoards/removeBoard',
  async boardId => {
    const response = await axios.delete(`http://localhost:3001/api/taskBoards/${boardId}`)
    return response.data
  }
)

export const removeUserFromBoard = createAsyncThunk(
  'taskBoards/removeUserFromBoard',
  async userId => {
    
  }
)

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
    removeAllBoards: taskBoardsAdapter.removeAll,
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
    [addBoard.fulfilled]: taskBoardsAdapter.addOne,
    [fetchTaskBoards.fulfilled]: taskBoardsAdapter.addMany,
    [removeBoard.fulfilled]: taskBoardsAdapter.removeOne,
  }
})

export const {
  selectAll: selectAllTaskBoards,
  selectById: selectTaskBoard,
} = taskBoardsAdapter.getSelectors(state => state.taskBoards)

// export const selectAllTasksOnBoard = createSelector(
//   selectTaskBoard,
//   taskBoard => taskBoard.taskIds
// )

export const { 
  addTask,
  addUser,
  removeAllBoards,
  removeUser, 
  removeTask 
} = taskBoardsSlice.actions

// export const getMaxId = createSelector(
//   selectAllTaskBoards,
//   taskBoards => taskBoards.reduce((board, maxId) => board.id > maxId ? board.id : maxId, -1).id
// )

export default taskBoardsSlice.reducer
