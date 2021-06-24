import {
  createSelector, 
  createSlice, 
  createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  users: [],
  signupError: null,
  loginError: null
}

export const checkLoginStatus = createAsyncThunk(
  'users/checkLoginStatus',
  async () => {
    const response = await axios.get('/api/auth/checkstatus')
    return response.data
  }
)

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get("/api/users")
    return response.data
  }
) 

export const login = createAsyncThunk(
  'users/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", user)
      return response.data
    }
    catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const logout = createAsyncThunk(
  'users/logout',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/logout", {userId})
      return response.data
    }
    catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const signup = createAsyncThunk(
  'users/signup',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/signup", user)
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
  reducers: {},
  extraReducers: {
    [checkLoginStatus.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.loginError = action.payload.error
      }
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload
    },
    [login.rejected]: (state, action) => {state.loginError = action.payload},
    [logout.fulfilled]: (state, action) => {state.users = []},
    [signup.fulfilled]: (state, action) => {state.users.push(action.payload)},
    [signup.rejected]: (state, action) => {state.signupError = action.payload}
  }
})

export const selectUserById = (state, userId) => 
  state.users.users.find(user => user.id === userId)

export const selectAllUsers = state => state.users.users

export const selectSignupError = state => state.users.signupError

export const getMaxId = createSelector(
  selectAllUsers,
  users => users.reduce((board, maxId) => board.id > maxId ? board.id : maxId, -1).id
)

export default usersSlice.reducer
