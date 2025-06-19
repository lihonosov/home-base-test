import React, { useEffect, useState, useMemo } from 'react';
import authService from '../services/auth.service';
import Profile from './Profile';
import Home from './Home';
import { CircularProgress, Box } from '@mui/material';

/**
 * Component that renders Profile if user is logged in, otherwise renders Home
 */
const ProtectedHome: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const user = authService.getCurrentUser();
      setIsLoggedIn(!!user);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize the conditional rendering to prevent unnecessary re-renders
  const content = useMemo(() => {
    return isLoggedIn ? <Profile /> : <Home />;
  }, [isLoggedIn]);

  // Improved loading indicator
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return content;
};

// Wrap with React.memo to prevent re-renders when parent components re-render
export default React.memo(ProtectedHome);
