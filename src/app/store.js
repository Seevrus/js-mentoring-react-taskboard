import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from '../features/taskboards/taskboard/tasksSlice';
import taskBoardsSlice from '../features/taskboards/taskBoardsSlice';
import usersSlice from '../features/users/usersSlice'
import filtersSlice from '../features/filters/filtersSlice'
import miscSlice from '../features/misc/miscSlice';

const preloadedState = {
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
    misc: miscSlice,
  },
  preloadedState
});
