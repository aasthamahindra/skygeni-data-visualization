import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingSkeleton = ({ 
  variant = 'rectangular',
  height = '100%',
  width = '100%',
  count = 1,
  animation = 'wave',
  spacing = 2,
  sx = {},
  ...props 
}) => {
  const skeletons = [];
  
  for (let i = 0; i < count; i++) {
    skeletons.push(
      <Skeleton
        key={i}
        variant={variant}
        animation={animation}
        sx={{
          width,
          height: count === 1 ? height : undefined,
          ...sx,
          mb: i < count - 1 ? spacing : 0,
        }}
        {...props}
      />
    );
  }

  return <Box>{skeletons}</Box>;
};

export const ChartSkeleton = ({ height = 300, sx = {} }) => (
  <Box sx={{ p: 2, width: '100%', ...sx }}>
    <Skeleton 
      variant="text" 
      width="60%" 
      height={32} 
      sx={{ mb: 2 }} 
    />
    <Skeleton 
      variant="rectangular" 
      height={height} 
      sx={{ 
        borderRadius: 1,
        ...sx
      }} 
    />
  </Box>
);

export const CardSkeleton = ({ height = 200, sx = {} }) => (
  <Box sx={{ p: 2, width: '100%', ...sx }}>
    <Skeleton 
      variant="text" 
      width="80%" 
      height={32} 
      sx={{ mb: 2 }} 
    />
    <Skeleton 
      variant="rectangular" 
      height={height - 60} 
      sx={{ 
        borderRadius: 1,
        mb: 2
      }} 
    />
    <Skeleton 
      variant="text" 
      width="60%" 
      height={24} 
    />
  </Box>
);

export default LoadingSkeleton;
