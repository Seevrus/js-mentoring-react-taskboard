import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  status: 'notLoggedIn',
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload
      state.status = 'loggedIn'
    },
  }
})

export default userSlice.reducer
export const { login } = userSlice.actions
