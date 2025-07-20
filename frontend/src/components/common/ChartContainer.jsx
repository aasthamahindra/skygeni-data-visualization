import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import { ChartSkeleton } from './LoadingSkeleton';

const ChartContainer = ({
  title,
  children,
  isLoading = false,
  error = null,
  onRetry,
  height = '400px',
  minHeight = '300px',
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '100%',
        minHeight: { xs: minHeight, md: height },
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 3,
        },
        ...sx,
      }}
      {...props}
    >
      {title && (
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
      )}
      
      <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <ErrorBoundary onRetry={onRetry}>
          {isLoading ? (
            <ChartSkeleton height={`calc(100% - 40px)`} />
          ) : error ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
              textAlign="center"
              p={2}
            >
              <Typography color="error" gutterBottom>
                Failed to load chart data
              </Typography>
              {onRetry && (
                <button 
                  onClick={onRetry}
                  style={{
                    background: 'none',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Retry
                </button>
              )}
            </Box>
          ) : (
            children
          )}
        </ErrorBoundary>
      </Box>
    </Paper>
  );
};

export default ChartContainer;
