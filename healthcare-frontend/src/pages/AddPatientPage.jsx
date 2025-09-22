// src/pages/AddPatientPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import PatientForm from '../components/PatientForm';
import { Container, Box, Typography, Alert } from '@mui/material';

function AddPatientPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPatient = async (patientData) => {
    setError('');
    setIsSubmitting(true);
    try {
      await apiClient.post('/api/patients/', patientData);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to add patient. Please check the details and try again.');
      console.error('Failed to add patient:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Add New Patient
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <PatientForm onSubmit={handleAddPatient} isSubmitting={isSubmitting} />
      </Box>
    </Container>
  );
}

export default AddPatientPage;