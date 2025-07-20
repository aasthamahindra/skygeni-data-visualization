import React from 'react';
import { Box } from '@mui/material';

const ResponsiveContainer = ({
  children,
  maxWidth = 'xl',
  sx = {},
  ...props
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, md: 3 },
        maxWidth: (theme) => {
          const breakpoints = theme.breakpoints.values;
          return maxWidth && breakpoints[maxWidth] 
            ? `${breakpoints[maxWidth]}px` 
            : maxWidth || '100%';
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;
