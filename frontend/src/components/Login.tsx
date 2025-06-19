import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Alert,
  Paper
} from '@mui/material';
import authService from '../services/auth.service';

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');
  const navigate = useNavigate();
  const location = useLocation();

  // Check for registration success message in URL
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const registered = query.get('registered');
    const message = query.get('message');

    if (registered === 'true' && message) {
      setMessage(decodeURIComponent(message));
      setMessageType('success');
    }
  }, [location]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setMessage('');
    setMessageType('error'); // Reset message type to error for any new messages
    setLoading(true);

    try {
      await authService.login(data.username, data.password);
      navigate('/profile');
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setLoading(false);
      setMessage(resMessage);
      setMessageType('error');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            {message && (
              <Alert severity={messageType} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
