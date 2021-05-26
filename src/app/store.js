import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from '../features/taskboards/taskboard/tasksSlice';
import taskBoardsSlice from '../features/taskboards/taskBoardsSlice';
import usersSlice from '../features/users/usersSlice'
import filtersSlice from '../features/filters/filtersSlice'

const preloadedState = {
  taskBoards: {
    ids: [1],
    entities: {
      1: { id: 1, name: "Board 1", userIds: [2, 3], taskIds: [1, 2, 3, 4, 5] },
    }
  },
  tasks: {
    ids: [1, 2, 3, 4, 5],
    entities: {
      1: { id: 1, text: "Task to do 1", status: "todo" },
      2: { id: 2, text: "Task to do 2", status: "todo" },
      3: { id: 3, text: "Task in progress", status: "inProgress" },
      4: { id: 4, text: "Done task", status: "finished" },
      5: { id: 5, text: "Finished task", status: "finished" },
    }
  },
  filters: {
    currentUser: null,
  }
}

export const store = configureStore({
  reducer: {
    users: usersSlice,
    taskBoards: taskBoardsSlice,
    tasks: tasksSlice,
    filters: filtersSlice,
  },
  preloadedState
});
