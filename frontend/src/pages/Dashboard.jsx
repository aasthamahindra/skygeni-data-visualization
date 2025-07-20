import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerType } from '../features/customerTypeSlice';
import { fetchAccountIndustry } from '../features/accountIndustrySlice';
import { fetchTeam } from '../features/teamSlice';
import { fetchAcvRange } from '../features/acvRangeSlice';
import DataCard from '../components/DataCard';
import CustomerTypeChart from '../components/charts/CustomerTypeChart';
import AccountIndustryChart from '../components/charts/AccountIndustryChart';
import TeamChart from '../components/charts/TeamChart';
import AcvRangeChart from '../components/charts/AcvRangeChart';
import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minHeight: '220px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  overflow: 'hidden',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0.5, 0),
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: '0.9rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const Dashboard = () => {
  const dispatch = useDispatch();

  // Select all dataset slices and their loading states from Redux store with proper defaults
  const { data: customerType = [], status: customerTypeStatus = 'idle' } = useSelector((state) => state.customerType || {});
  const { data: accountIndustry = [], status: accountIndustryStatus = 'idle' } = useSelector((state) => state.accountIndustry || {});
  const { data: team = [], status: teamStatus = 'idle' } = useSelector((state) => state.team || {});
  const { data: acvRange = [], status: acvRangeStatus = 'idle' } = useSelector((state) => state.acvRange || {});

  // Check if this is the initial load (all statuses are 'idle')
  const isInitialLoad = [
    customerTypeStatus,
    accountIndustryStatus,
    teamStatus,
    acvRangeStatus
  ].every(status => status === 'idle');

  // Check if any data is still loading or in initial state
  const isLoading = [
    customerTypeStatus === 'loading' || customerTypeStatus === 'idle',
    accountIndustryStatus === 'loading' || accountIndustryStatus === 'idle',
    teamStatus === 'loading' || teamStatus === 'idle',
    acvRangeStatus === 'loading' || acvRangeStatus === 'idle'
  ].some(Boolean);

  // Check if any data failed to load
  const hasError = [
    customerTypeStatus === 'failed',
    accountIndustryStatus === 'failed',
    teamStatus === 'failed',
    acvRangeStatus === 'failed'
  ].some(Boolean);
  
  // Check if all data has been loaded successfully
  const isAllDataLoaded = [
    customerTypeStatus === 'succeeded',
    accountIndustryStatus === 'succeeded',
    teamStatus === 'succeeded',
    acvRangeStatus === 'succeeded'
  ].every(Boolean);

  // Load all datasets on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCustomerType()),
          dispatch(fetchAccountIndustry()),
          dispatch(fetchTeam()),
          dispatch(fetchAcvRange())
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const theme = useTheme();

  const renderSection = (title, data, labelKey, ChartComponent, status) => {
    const isDataLoading = status === 'loading' || (status === 'idle' && !isAllDataLoaded);
    const hasData = Array.isArray(data) && data.length > 0;
    const isError = status === 'failed';
    const isReady = status === 'succeeded' || (status === 'idle' && isAllDataLoaded);
    
    const renderContent = (isChart = false) => {
      if (isError) {
        return <Box sx={{ p: 2, textAlign: 'center', color: 'error.main' }}>Error loading {isChart ? 'chart' : 'data'}</Box>;
      }
      
      if (isDataLoading && !isReady) {
        return <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
          {isChart ? 'Loading chart...' : 'Loading...'}
        </Box>;
      }
      
      if (!hasData) {
        return <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
          No {isChart ? 'chart data' : 'data'} available
        </Box>;
      }
      
      return isChart ? <ChartComponent data={data} /> : <DataCard data={data} labelKey={labelKey} compact />;
    };
    
    return (
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <SectionTitle title={title}>{title}</SectionTitle>
        <Grid container spacing={1} sx={{ flex: 1, minHeight: '240px' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', height: '100%' }}>
            <ChartContainer>
              {renderContent(false)}
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', height: '100%' }}>
            <ChartContainer>
              {renderContent(true)}
            </ChartContainer>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  if (isInitialLoad) {
    // Only show loading screen if we're at the very beginning
    // and haven't started loading anything yet
    const hasStartedLoading = [
      customerTypeStatus,
      accountIndustryStatus,
      teamStatus,
      acvRangeStatus
    ].some(status => status !== 'idle');
    
    if (!hasStartedLoading) {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: theme.palette.grey[100],
        }}>
          <Typography>Loading dashboard...</Typography>
        </Box>
      );
    }
  }

  if (hasError) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: theme.palette.grey[100],
        color: 'error.main',
        p: 2,
        textAlign: 'center'
      }}>
        <Typography>Error loading dashboard data. Please try refreshing the page.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 1, 
      height: '100vh',
      maxHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.grey[100],
    }}>
      <Box sx={{ 
        py: 1,
        textAlign: 'center',
        flexShrink: 0,
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.primary.main,
            lineHeight: 1.2,
          }}
        >
          ACV Dashboard
        </Typography>
      </Box>
      
      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.grey[200],
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.grey[400],
          borderRadius: '4px',
        },
      }}>
        <Box sx={{ p: 0.5, pb: 2 }}>
          {/* First Row */}
          <Grid container spacing={1} sx={{ mb: 1 }}>
            {renderSection('Customer Type', customerType, 'Cust_Type', CustomerTypeChart, customerTypeStatus)}
            {renderSection('Account Industry', accountIndustry, 'Acct_Industry', AccountIndustryChart, accountIndustryStatus)}
          </Grid>

          {/* Second Row */}
          <Grid container spacing={1}>
            {renderSection('Team Distribution', team, 'Team', TeamChart, teamStatus)}
            {renderSection('ACV Range', acvRange, 'ACV_Range', AcvRangeChart, acvRangeStatus)}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;