import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from '../features/taskboards/taskboard/tasksSlice';
import taskBoardsSlice from '../features/taskboards/taskBoardsSlice';
import usersReducer from '../features/users/usersSlice'

const preloadedState = {
  users: {
    ids: [1, 2, 3],
    entities: {
      1: { id: 1, email: 'WilliamWhite@rhyta.com', password: '11111951', loggedin: false },
      2: { id: 2, email: 'TinaRaley@armyspy.com', password: '01111949', loggedin: false },
      3: { id: 3, email: 'HarryBarns@dayrep.com', password: '12281996', loggedin: false },
    }
  },
  taskBoards: {
    ids: [1],
    entities: {
      1: { id: 1, userIds: [2, 3], taskIds: [1, 2, 3, 4, 5] },
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
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
    taskBoards: taskBoardsSlice,
    tasks: tasksSlice
  },
  preloadedState
});
