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

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const tasksAdapter = createEntityAdapter()
const initialState = tasksAdapter.getInitialState()

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ boardId, text }) => {
    const response = await axios.post("/api/tasks", { boardId, text })
    return response.data
  }
)

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async boardId => {
    const response = await axios.get(`/api/tasks/${boardId}`)
    return response.data
  }
)

export const removeAllTasksOnBoard = createAsyncThunk(
  'tasks/removeAllTasksOnBoard',
  async boardId => {
    const response = await axios.delete(`/api/tasks/all/${boardId}`)
    return response.data
  }
)

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async ({boardId, taskId}) => {
    const response = await axios.delete(`/api/tasks/${boardId}-${taskId}`)
    return response.data
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, boardId, status }) => {
    const response = await axios.post('/api/tasks/update', { id, boardId, status })
    return response.data
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [addTask.fulfilled]: tasksAdapter.addOne,
    [fetchTasks.fulfilled]: tasksAdapter.addMany,
    [removeAllTasksOnBoard.fulfilled]: tasksAdapter.removeMany,
    [removeTask.fulfilled]: tasksAdapter.updateMany,
    [updateTask.fulfilled]: tasksAdapter.updateMany,
  }
})

export default tasksSlice.reducer
