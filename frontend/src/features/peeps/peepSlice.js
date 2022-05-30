import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import peepService from './peepService'

const initialState = {
  peeps: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new peep
export const createPeep = createAsyncThunk(
  'peeps/create',
  async (peepData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await peepService.createPeep(peepData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user peeps
export const getPeeps = createAsyncThunk(
  'peeps/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await peepService.getPeeps(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user peep
export const deletePeep = createAsyncThunk(
  'peeps/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await peepService.deletePeep(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const peepSlice = createSlice({
  name: 'peep',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPeep.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPeep.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.peeps.push(action.payload)
      })
      .addCase(createPeep.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPeeps.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPeeps.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.peeps = action.payload
      })
      .addCase(getPeeps.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePeep.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePeep.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.peeps = state.peeps.filter(
          (peep) => peep._id !== action.payload.id
        )
      })
      .addCase(deletePeep.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = peepSlice.actions
export default peepSlice.reducer