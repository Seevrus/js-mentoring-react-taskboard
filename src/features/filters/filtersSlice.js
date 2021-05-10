import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {},
  reducers: {}
})

export const getCurrentUser = state => state.filters.currentUser

export default filtersSlice.reducer
