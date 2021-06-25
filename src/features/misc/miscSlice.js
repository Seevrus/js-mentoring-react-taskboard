import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setCsrfToken } from "./setCsrfToken"

const initialState = {}

export const fetchCsrfToken = createAsyncThunk(
  'misc/fetchCsrfToken',
  async () => {
    const response = await axios.get('/api/auth/csrf-token')
    return response.data
  }
)

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCsrfToken.fulfilled]: (state, action) => {
      const token = action.payload.csrfToken
      setCsrfToken(token)
    }
  }
})

export default miscSlice.reducer
