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
    const response = await axios.post("/api/taskBoards", { boardName })
    return response.data
  }
)

export const fetchTaskBoards = createAsyncThunk(
  'taskBoards/fetchTaskBoards',
  async () => {
    const response = await axios.get("/api/taskBoards")
    return response.data
  }
)

export const removeBoard = createAsyncThunk(
  'taskBoards/removeBoard',
  async boardId => {
    const response = await axios.delete(`/api/taskBoards/${boardId}`)
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

export const {
  addUser,
  removeAllBoards,
  removeUser
} = taskBoardsSlice.actions

export default taskBoardsSlice.reducer
