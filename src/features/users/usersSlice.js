import { current, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      const user = state.entities[action.payload]
      if (user) {
        user.loggedin = true
      }
    },
    signup: (state, action) => {
      const userId = Math.max(...current(state).ids) + 1
      const user = { 
        id: userId,
        email: action.payload.email,
        password: action.payload.password,
      }
      usersAdapter.addOne(state, user)
    }
  },
  extraReducers:{}
})

export const { login, signup } = usersSlice.actions

export const { 
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(state => state.users)

export const getMaxId = createSelector(
  selectAllUsers,
  users => users.reduce((board, maxId) => board.id > maxId ? board.id : maxId, -1).id
)

export default usersSlice.reducer
