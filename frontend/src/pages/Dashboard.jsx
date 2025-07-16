import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerType } from "../features/customerTypeSlice";

const Dashboard = () => {
    const dispatch = useDispatch();

    // get data, status and error from redux store
    const { data, status, error } = useSelector((state) => state.customerType);

    useEffect(() => {
        dispatch(fetchCustomerType());
    }, [dispatch]);

    return (
        <div>
            <h3>Customer Type ACV</h3>
            {/* Loading state */}
            {status === 'loading' && <p>Loading...</p>}

            {/* Error state */}
            {status === 'failed' && <p>Error: {error}</p>}

            {/* Success state — show data list */}
            {status === 'succeeded' && (
                <ul>
                {data.map((entry, index) => (
                    <li key={index}>
                    {/* Render basic info: quarter, type, acv and count */}
                    {entry.closed_fiscal_quarter} — {entry.Cust_Type} — ${entry.acv.toFixed(2)} ({entry.count} opps)
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;