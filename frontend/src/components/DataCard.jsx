import React from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell, TableHead, Paper } from '@mui/material';
import { formatCurrency } from '../utils/formatters';

const DataCard = ({ data, labelKey, compact = false }) => {
    // group data by label
    const grouped = {};

    data?.forEach(item => {
        const key = item[labelKey];
        if (!grouped[key]) {
            grouped[key] = { acv: 0, count: 0 };
        }
        grouped[key].acv += item.acv || 0;
        grouped[key].count += item.count || 1;
    });

    const sortedEntries = Object.entries(grouped).sort((a, b) => b[1].acv - a[1].acv);
    const totalAcv = sortedEntries.reduce((sum, [_, values]) => sum + values.acv, 0);

    if (compact) {
        return (
            <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <Table size="small" sx={{ '& .MuiTableCell-root': { py: 0.5, px: 1 } }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">ACV</TableCell>
                            <TableCell align="right">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedEntries.map(([label, values], index) => (
                            <TableRow key={index} hover>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>{label}</TableCell>
                                <TableCell align="right">{formatCurrency(values.acv)}</TableCell>
                                <TableCell align="right">{values.count}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow sx={{ '&:last-child td': { borderBottom: 0 } }}>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell align="right"><strong>{formatCurrency(totalAcv)}</strong></TableCell>
                            <TableCell align="right"><strong>{sortedEntries.reduce((sum, [_, values]) => sum + values.count, 0)}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">ACV</TableCell>
                        <TableCell align="right">Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedEntries.map(([label, values], index) => (
                        <TableRow key={index} hover>
                            <TableCell>{label}</TableCell>
                            <TableCell align="right">{formatCurrency(values.acv)}</TableCell>
                            <TableCell align="right">{values.count}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell><strong>Total</strong></TableCell>
                        <TableCell align="right"><strong>{formatCurrency(totalAcv)}</strong></TableCell>
                        <TableCell align="right"><strong>{sortedEntries.reduce((sum, [_, values]) => sum + values.count, 0)}</strong></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default DataCard;