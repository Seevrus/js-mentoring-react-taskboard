import {
  createSelector, 
  createSlice, 
  createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  signupError: null,
  loginError: null
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get("http://localhost:3001/api/users")
    return response.data
  }
)

export const signup = createAsyncThunk(
  'users/signup',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/users", user)
      return response.data
    }
    catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

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
  },
  extraReducers: {
      [fetchUsers.fulfilled]: (state, action) => {
        state.users = action.payload
      },
      [signup.fulfilled]: (state, action) => {state.users.push(action.payload)},
      [signup.rejected]: (state, action) => {state.signupError = action.payload}
  }
})

export const { login } = usersSlice.actions

export const selectUserById = (state, userId) => 
  state.users.users.find(user => user.id === userId)

export const selectAllUsers = state => state.users.users

export const selectSignupError = state => state.users.signupError

export const getMaxId = createSelector(
  selectAllUsers,
  users => users.reduce((board, maxId) => board.id > maxId ? board.id : maxId, -1).id
)

export default usersSlice.reducer
