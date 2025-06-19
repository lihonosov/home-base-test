import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import authService from '../services/auth.service';
import { User } from '../types/auth.types';

const Profile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const user = authService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Memoize the profile content to prevent unnecessary re-renders
  const profileContent = useMemo(() => {
    if (!currentUser) return null;

    return (
      <Container component="main" maxWidth="md">
        <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" gutterBottom>
              Profile
            </Typography>
            <Typography component="h2" variant="h6" color="primary">
              Welcome, {currentUser.username}!
            </Typography>

            <List sx={{ width: '100%', mt: 2 }}>
              <ListItem>
                <ListItemText primary="Username" secondary={currentUser.username} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Email" secondary={currentUser.email} />
              </ListItem>
              <Divider component="li" />
            </List>
          </Box>
        </Paper>
      </Container>
    );
  }, [currentUser]);

  if (loading) {
    return (
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return profileContent;
};

// Wrap with React.memo to prevent re-renders when parent components re-render
export default React.memo(Profile);
