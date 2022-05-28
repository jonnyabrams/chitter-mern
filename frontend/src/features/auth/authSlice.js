import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// For user - asking is there a user in localStorage? If not, then null
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: () => {}
})

export const { reset } = authSlice.actions
export default authSlice.reducer