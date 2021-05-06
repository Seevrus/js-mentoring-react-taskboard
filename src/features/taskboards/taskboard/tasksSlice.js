/**
 
{
  ids: [],
  entities: [
    {
      id:
      text: "Task to do 1"
      status: "todo"
    },
    ...
  ]
}

 */

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter()
const initialState = tasksAdapter.getInitialState()

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {}
})

export default tasksSlice.reducer
