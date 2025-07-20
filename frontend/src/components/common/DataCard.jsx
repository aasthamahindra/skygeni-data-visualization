import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles';

const DataCard = ({
  title = '',
  data = [],
  loading = false,
  error = null,
  onRetry = () => {},
  tooltip = '',
  labelKey = 'label',
  valueKey = 'value',
  sx = {},
  children
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={24} />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center', color: theme.palette.error.main }}>
          <ErrorOutlineIcon sx={{ fontSize: 48, mb: 2, opacity: 0.6 }} />
          <Typography variant="body1" gutterBottom>Error loading data</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{error.toString()}</Typography>
          <Button variant="outlined" onClick={onRetry} size="small">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body1">No data available</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {title && (
          <Typography variant="h6" component="h3" gutterBottom>
            {title}
          </Typography>
        )}
        {children || (
          <Box>
            {data.map((item, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    {item[labelKey]}:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {item[valueKey]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DataCard;
