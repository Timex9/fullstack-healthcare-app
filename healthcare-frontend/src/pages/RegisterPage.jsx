// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import apiClient from '../api/apiClient';
import {
  Container, Box, Typography, TextField, Button, Alert, CircularProgress, Link, Grid
} from '@mui/material';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await apiClient.post('/api/auth/register/', formData);
      // On success, redirect to the login page with a success message (optional)
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      // Handle specific errors from the backend if available
      const errorData = err.response?.data;
      if (errorData) {
        // Combine all error messages into one string
        const errorMessages = Object.values(errorData).flat().join(' ');
        setError(errorMessages || 'Registration failed. Please check your details.');
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Registration failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="first_name" required fullWidth label="First Name" onChange={handleChange} autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="last_name" required fullWidth label="Last Name" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="username" required fullWidth label="Username" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" required fullWidth label="Email Address" type="email" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" required fullWidth label="Password" type="password" onChange={handleChange} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;