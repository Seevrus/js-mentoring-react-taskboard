import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'

const preloadedState = {
  users: {
    ids: [1, 2, 3],
    entities: {
      1: { id: 1, email: 'WilliamWhite@rhyta.com', password: '11111951', loggedin: false },
      2: { id: 2, email: 'TinaRaley@armyspy.com', password: '01111949', loggedin: false },
      3: { id: 3, email: 'HarryBarns@dayrep.com', password: '12281996', loggedin: false },
    }
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState
});
