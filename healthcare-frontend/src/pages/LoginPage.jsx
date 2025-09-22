// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom'; // 1. Import Link and useLocation
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import {
  Container, Box, Typography, TextField, Button, Alert, CircularProgress, Link, Grid // 2. Import Grid
} from '@mui/material';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To get success messages from registration
  const successMessage = location.state?.message;

  // ... keep the handleSubmit function the same ...
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/auth/login/', { username, password });
      login(response.data.access);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* 3. Add alerts for both success and error messages */}
          {successMessage && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{successMessage}</Alert>}
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

          <TextField margin="normal" required fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>

          {/* 4. Add the link to the register page */}
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;