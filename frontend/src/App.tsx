import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Snackbar, Alert } from '@mui/material';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedHome from './components/ProtectedHome';

import './services/axios-interceptor';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Component to handle authentication errors
const AuthErrorHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    // Function to handle auth error event
    const handleAuthError = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.message) {
        setMessage(customEvent.detail.message);
      } else {
        setMessage('Authentication failed. Please log in again.');
      }
      setOpen(true);

      // Only navigate if not already on login page
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    };

    // Add event listener
    window.addEventListener('auth-error', handleAuthError);

    // Cleanup function
    return () => {
      window.removeEventListener('auth-error', handleAuthError);
    };
  }, [navigate, location.pathname]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <AuthErrorHandler />
      <Routes>
        <Route path="/" element={<ProtectedHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
