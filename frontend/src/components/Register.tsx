import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Alert,
  Paper,
  Grid
} from '@mui/material';
import authService from '../services/auth.service';

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setError('');
    setLoading(true);

    try {
      const response = await authService.register(
        data.username,
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );

      // Immediately redirect to login page with success message
      const successMessage = response.data.message || 'User registered successfully!';
      navigate('/login?registered=true&message=' + encodeURIComponent(successMessage));
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setError(resMessage);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName', { required: 'First name is required' })}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register('lastName', { required: 'Last name is required' })}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  {...register('username', { 
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Username must not exceed 20 characters'
                    }
                  })}
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    },
                    maxLength: {
                      value: 40,
                      message: 'Password must not exceed 40 characters'
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              </Grid>
            </Grid>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
