import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { Container, Box, Typography, Button, CircularProgress, Alert, Card, CardContent, CardActions, Link } from '@mui/material';

function PatientDetailPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get(`/api/patients/${patientId}/`)
      .then(response => setPatient(response.data))
      .catch(err => {
        setError('Failed to fetch patient details.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [patientId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      try {
        await apiClient.delete(`/api/patients/${patientId}/`);
        navigate('/dashboard');
      } catch (err) {
        setError('Failed to delete patient.');
        console.error(err);
      }
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
  if (!patient) return <Typography sx={{ m: 4 }}>Patient not found.</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>Patient Details</Typography>
        <Card>
          <CardContent>
            <Typography variant="h5">{patient.first_name} {patient.last_name}</Typography>
            <Typography color="text.secondary">Date of Birth: {patient.date_of_birth}</Typography>
            <Typography color="text.secondary">Gender: {patient.gender}</Typography>
            <Typography color="text.secondary">Contact: {patient.contact_number}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>Address: {patient.address}</Typography>
          </CardContent>
          <CardActions>
            <Link component={RouterLink} to={`/patients/${patientId}/edit`}><Button size="small" variant="contained">Edit</Button></Link>
            <Button size="small" variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          </CardActions>
        </Card>
        <Link component={RouterLink} to="/dashboard" sx={{ mt: 2, display: 'block' }}>&larr; Back to Dashboard</Link>
      </Box>
    </Container>
  );
}

export default PatientDetailPage;