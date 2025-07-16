import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAcvRange = createAsyncThunk(
  'acvRange/fetchAcvRange',
  async () => {
    const response = await axios.get('http://localhost:4000/api/acv-range');
    return response.data.data;
  }
);

const acvRangeSlice = createSlice({
  name: 'acvRange',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcvRange.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAcvRange.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAcvRange.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default acvRangeSlice.reducer;