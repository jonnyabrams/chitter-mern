import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import peepReducer from '../features/peeps/peepSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    peeps: peepReducer,
  },
})