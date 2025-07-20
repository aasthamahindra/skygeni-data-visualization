import { configureStore } from '@reduxjs/toolkit';
import customerTypeReducer from '../features/customerTypeSlice';
import accountIndustryReducer from '../features/accountIndustrySlice';
import teamReducer from '../features/teamSlice';
import acvRangeReducer from '../features/acvRangeSlice';

// configure store with a reducer per data slice
export const store = configureStore({
    reducer: {
        customerType: customerTypeReducer,
        accountIndustry: accountIndustryReducer,
        team: teamReducer,
        acvRange: acvRangeReducer,  // Fixed: Changed from acvRangeReducer to acvRange
    },
});