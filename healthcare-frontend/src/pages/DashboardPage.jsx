import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import { Container, Box, Typography, Button, List, ListItem, ListItemText, ListItemIcon, CircularProgress, Link, Alert, ListItemButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/api/patients/')
      .then(response => setPatients(response.data))
      .catch(err => {
        setError('Could not load patient data.');
        console.error('Failed to fetch patients:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">Dashboard</Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">Your Patients</Typography>
          <Link component={RouterLink} to="/add-patient"><Button variant="contained">Add New Patient</Button></Link>
        </Box>
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <List>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <ListItem key={patient.id} disablePadding>
                  <ListItemButton component={RouterLink} to={`/patients/${patient.id}`}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary={`${patient.first_name} ${patient.last_name}`} secondary={`Born: ${patient.date_of_birth}`} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (<Typography sx={{ mt: 2 }}>You have not added any patients yet.</Typography>)}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default DashboardPage;