import { configureStore } from '@reduxjs/toolkit';
import customerTypeReducer from '../features/customerTypeSlice';

// configure store with a reducer per data slice
export const store = configureStore({
    reducer: {
        customerType: customerTypeReducer
    },
});