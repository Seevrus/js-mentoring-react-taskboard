import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {},
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    }
  }
})

export const { setCurrentUser } = filtersSlice.actions

export const getCurrentUser = state => state.filters.currentUser

export default filtersSlice.reducer
