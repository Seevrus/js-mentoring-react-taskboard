import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers:{}
})

export const { 
  selectAll: selectAllUsers
} = usersAdapter.getSelectors(state => state.users)

export default usersSlice.reducer
