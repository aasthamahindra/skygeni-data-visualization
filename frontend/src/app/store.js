import { configureStore } from '@reduxjs/toolkit';
import customerTypeReducer from '../features/customerTypeSlice';

export const store = configureStore({
    reducer: {
        customerType: customerTypeReducer
    },
});