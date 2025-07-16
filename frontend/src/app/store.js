import { configureStore } from '@reduxjs/toolkit';
import customerTypeReducer from '../features/customerTypeSlice';
import accountIndustryReducer from '../features/customerTypeSlice';
import teamReducer from '../features/customerTypeSlice';
import acvRangeReducer from '../features/customerTypeSlice';

// configure store with a reducer per data slice
export const store = configureStore({
    reducer: {
        customerType: customerTypeReducer,
        accountIndustry: accountIndustryReducer,
        team: teamReducer,
        acvRangeReducer: acvRangeReducer,
    },
});