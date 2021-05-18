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

import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter()
const initialState = tasksAdapter.getInitialState()

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    removeTask: tasksAdapter.removeOne,
    updateTask: (state, action) => {
      const { id, status } = action.payload
      const existingTodo = state.entities[id]
      if (existingTodo) {
        existingTodo.status = status
      }
    },
  }
})

export const { 
  selectAll: selectAllTasks,
} = tasksAdapter.getSelectors(state => state.tasks)

export const getMaxId = createSelector(
  selectAllTasks,
  tasks => tasks.reduce((task, maxId) => task.id > maxId ? task.id : maxId, -1).id
)

export const { addTask, removeTask, updateTask } = tasksSlice.actions

export default tasksSlice.reducer
