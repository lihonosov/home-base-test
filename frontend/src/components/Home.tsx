import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Paper,
  Grid
} from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography component="h1" variant="h3" gutterBottom>
            Welcome to Home Based Test
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            A simple application with user authentication
          </Typography>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            This application demonstrates a login form implementation with Spring Boot backend and React frontend.
            It includes user registration, login, and profile management features.
          </Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/register"
                size="large"
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                component={RouterLink} 
                to="/login"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

// Wrap with React.memo to prevent re-renders when parent components re-render
export default React.memo(Home);
