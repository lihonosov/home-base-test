import React, { useState, useEffect, MouseEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import authService from '../services/auth.service';
import { User } from '../types/auth.types';

// Custom event name for auth state changes
const AUTH_STATE_CHANGE_EVENT = 'authStateChange';

const Navigation: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  // Function to update current user state
  const updateCurrentUser = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    // Initial check for user
    updateCurrentUser();

    // Add event listener for auth state changes
    window.addEventListener(AUTH_STATE_CHANGE_EVENT, updateCurrentUser);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE_EVENT, updateCurrentUser);
    };
  }, []);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setAnchorEl(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={currentUser ? "/profile" : "/"}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            HOME BASED TEST
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {currentUser ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                sx={{ my: 2, display: 'block' }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                color="inherit"
                sx={{ my: 2, display: 'block' }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
