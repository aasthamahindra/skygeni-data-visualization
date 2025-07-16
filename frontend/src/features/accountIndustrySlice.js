import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAccountIndustry = createAsyncThunk(
  'accountIndustry/fetchAccountIndustry',
  async () => {
    const response = await axios.get('http://localhost:4000/api/account-industry');
    return response.data.data;
  }
);

const accountIndustrySlice = createSlice({
  name: 'accountIndustry',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountIndustry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccountIndustry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAccountIndustry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default accountIndustrySlice.reducer;