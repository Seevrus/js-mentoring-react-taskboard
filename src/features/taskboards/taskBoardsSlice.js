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

export const addUserToBoard = createAsyncThunk(
  'taskBoards/addUserToBoard',
  async ({ boardId, userId }) => {
    const response = await axios.post("/api/taskBoards/user", { boardId, userId })
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
  async ({ boardId, userId }) => {
    const response = await axios.delete(`/api/taskBoards/user/${boardId}-${userId}`)
    return response.data
  }
)

const taskBoardsSlice = createSlice({
  name: 'taskBoards',
  initialState,
  reducers: {
    removeAllBoards: taskBoardsAdapter.removeAll,
  },
  extraReducers: {
    [addBoard.fulfilled]: taskBoardsAdapter.addOne,
    [addUserToBoard.fulfilled]: taskBoardsAdapter.updateMany,
    [fetchTaskBoards.fulfilled]: taskBoardsAdapter.addMany,
    [removeBoard.fulfilled]: taskBoardsAdapter.removeOne,
    [removeUserFromBoard.fulfilled]: taskBoardsAdapter.updateMany,
  }
})

export const {
  selectAll: selectAllTaskBoards,
  selectById: selectTaskBoard,
} = taskBoardsAdapter.getSelectors(state => state.taskBoards)

export const {
  removeAllBoards,
} = taskBoardsSlice.actions

export default taskBoardsSlice.reducer
