import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

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
    }
  },
  extraReducers:{}
})

export const { login } = usersSlice.actions

export const { 
  selectAll: selectAllUsers
} = usersAdapter.getSelectors(state => state.users)

export default usersSlice.reducer
