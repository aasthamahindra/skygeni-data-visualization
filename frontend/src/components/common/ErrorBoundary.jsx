import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error: {
        message: error.message,
        stack: error.stack
      }
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'error.light',
            borderRadius: 1,
            bgcolor: 'error.background',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: this.props.minHeight || '200px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            {this.props.title || 'Something went wrong'}
          </Typography>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{ mb: 2, p: 1, bgcolor: 'background.paper', borderRadius: 1, maxWidth: '100%', overflow: 'auto' }}>
              <Typography variant="caption" color="textSecondary">
                {this.state.error.message}
              </Typography>
            </Box>
          )}
          <Button
            variant="outlined"
            color="error"
            onClick={this.handleRetry}
            sx={{ mt: 1 }}
          >
            {this.props.retryText || 'Try Again'}
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
