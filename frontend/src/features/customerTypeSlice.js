import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// fetch customer type data from api
export const fetchCustomerType = createAsyncThunk(
    'customerType/fetchCustomerType',
    async () => {
        const response = await axios.get('http://localhost:4000/api/customer-type');
        return response.data.data;
    }
);

// create the slice
const customerTypeSlice = createSlice({
    name: 'customerType',
    initialState: {
        data: [],
        status: 'idle', // loading state
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCustomerType.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchCustomerType.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        }).addCase(fetchCustomerType.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export default customerTypeSlice.reducer;