import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerType } from '../features/customerTypeSlice';
import { fetchAccountIndustry } from '../features/accountIndustrySlice';
import { fetchTeam } from '../features/teamSlice';
import { fetchAcvRange } from '../features/acvRangeSlice';
import DataCard from '../components/DataCard';
import { Grid } from '@mui/material';

const Dashboard = () => {
  const dispatch = useDispatch();

  // Select all dataset slices from Redux store
  const customerType = useSelector((state) => state.customerType?.data);
  const accountIndustry = useSelector((state) => state.accountIndustry?.data);
  const team = useSelector((state) => state.team?.data);
  const acvRange = useSelector((state) => state.acvRange?.data);

  // Load all datasets on component mount
  useEffect(() => {
    dispatch(fetchCustomerType());
    dispatch(fetchAccountIndustry());
    dispatch(fetchTeam());
    dispatch(fetchAcvRange());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {/* ensuring array is loaded before rendering */}
      {Array.isArray(customerType) && (
        <Grid item xs={12} md={6}>
          <DataCard title="Customer Type" data={customerType} labelKey="Cust_Type" />
        </Grid>
      )}

      {Array.isArray(accountIndustry) && (
        <Grid item xs={12} md={6}>
          <DataCard title="Account Industry" data={accountIndustry} labelKey="Acct_Industry" />
        </Grid>
      )}

      {Array.isArray(team) && (
        <Grid item xs={12} md={6}>
          <DataCard title="Team" data={team} labelKey="Team" />
        </Grid>
      )}

      {Array.isArray(acvRange) && (
        <Grid item xs={12} md={6}>
          <DataCard title="ACV Range" data={acvRange} labelKey="ACV_Range" />
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;