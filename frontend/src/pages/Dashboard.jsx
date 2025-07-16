import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerType } from '../features/customerTypeSlice';
import { fetchAccountIndustry } from '../features/accountIndustrySlice';
import { fetchTeam } from '../features/teamSlice';
import { fetchAcvRange } from '../features/acvRangeSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  // selectors for datasets
  const customerType = useSelector((state) => state.customerType.data);
  const accountIndustry = useSelector((state) => state.accountIndustry.data);
  const team = useSelector((state) => state.team.data);
  const acvRange = useSelector((state) => state.acvRange.data);

  useEffect(() => {
    dispatch(fetchCustomerType());
    dispatch(fetchAccountIndustry());
    dispatch(fetchTeam());
    dispatch(fetchAcvRange());
  }, [dispatch]);

  return (
    <div>
      <h3>Customer Type</h3>
      <ul>
        {customerType.map((item, i) => (
          <li key={i}>{item.closed_fiscal_quarter} - {item.Cust_Type}: ${item.acv.toFixed(2)}</li>
        ))}
      </ul>

      <h3>Account Industry</h3>
      <ul>
        {accountIndustry.map((item, i) => (
          <li key={i}>{item.closed_fiscal_quarter} - {item.Acct_Industry}: ${item.acv.toFixed(2)}</li>
        ))}
      </ul>

      <h3>Team</h3>
      <ul>
        {team.map((item, i) => (
          <li key={i}>{item.closed_fiscal_quarter} - {item.Team}: ${item.acv.toFixed(2)}</li>
        ))}
      </ul>

      <h3>ACV Range</h3>
      <ul>
        {acvRange.map((item, i) => (
          <li key={i}>{item.closed_fiscal_quarter} - {item.ACV_Range}: ${item.acv.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;