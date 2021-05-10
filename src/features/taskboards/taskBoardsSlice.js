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

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const taskBoardsAdapter = createEntityAdapter()
const initialState = taskBoardsAdapter.getInitialState()

const taskBoardsSlice = createSlice({
  name: 'taskBoards',
  initialState,
  reducers: {
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
} = taskBoardsAdapter.getSelectors(state => state.taskBoards)

export const { removeUser, removeTask } = taskBoardsSlice.actions

export default taskBoardsSlice.reducer
