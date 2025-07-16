import React from "react";
import { Card, CardContent, Typography, Divider } from '@mui/material';

// reusable card component to display ACV summary
const DataCard = ({ title, data, labelKey }) => {
    // group data by label
    const grouped = {};

    data.forEach(item => {
        const key = item[labelKey];
        if (!grouped[key]) {
            grouped[key] = { acv: 0, count: 0 };
        }
        grouped[key].acv += item.acv;
        grouped[key].count += item.count;
    });

    return (
        <Card sx={{ mb: 3, p: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                {title}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {Object.entries(grouped).map(([label, values], index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    <strong>{label}:</strong> ${values.acv.toFixed(2)} | {values.count} opportunities
                </Typography>
                ))}
            </CardContent>
        </Card>
    )
}

export default DataCard;