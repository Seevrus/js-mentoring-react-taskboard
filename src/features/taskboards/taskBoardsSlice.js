/**
 
{
  ids: [],
  entities: [
    {
      id:
      users: [<userId>, <userId>, ...]
      tasks: [<taskId>, <taskId>, ...]
    },
    ...
  ]
}

 */

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const taskBoardsAdapter = createEntityAdapter()
const initialState = taskBoardsAdapter.getInitialState()

const taskBoardsSlice = createSlice({
  name: 'taskBoards',
  initialState,
  reducers: {}
})

export const {
  selectAll: selectAllTaskBoards,
} = taskBoardsAdapter.getSelectors(state => state.taskBoards)

export default taskBoardsSlice.reducer
