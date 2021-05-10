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
    addTask: (state, action) => {
      const id = getMaxId()
      const { name, userId } = action.payload
      tasksAdapter.addOne({ id: id+1, name, userIds: [userId], taskIds: [] })
    },
    removeTask: tasksAdapter.removeOne
  }
})

export const { 
  selectAll: selectAllTasks,
} = tasksAdapter.getSelectors(state => state.tasks)

export const getMaxId = createSelector(
  selectAllTasks,
  tasks => tasks.reduce((task, maxId) => task.id > maxId ? task.id : maxId, -1).id
)

export const { addTask, removeTask } = tasksSlice.actions

export default tasksSlice.reducer
