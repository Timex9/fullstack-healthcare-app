// src/pages/EditPatientPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import PatientForm from '../components/PatientForm';
import { Container, Box, Typography, Alert, CircularProgress } from '@mui/material';

function EditPatientPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the current patient data to pre-fill the form
    apiClient.get(`/api/patients/${patientId}/`)
      .then(response => {
        setInitialData(response.data);
      })
      .catch(err => {
        setError('Failed to load patient data.');
        console.error(err);
      });
  }, [patientId]);

  const handleUpdatePatient = async (patientData) => {
    setError('');
    setIsSubmitting(true);
    try {
      // Send a PUT request with the updated data
      await apiClient.put(`/api/patients/${patientId}/`, patientData);
      navigate(`/patients/${patientId}`); // Go back to the detail page on success
    } catch (err) {
      setError('Failed to update patient. Please check the details and try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialData && !error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Edit Patient
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        {/* We render the form only after we have the initial data */}
        {initialData && <PatientForm onSubmit={handleUpdatePatient} initialData={initialData} isSubmitting={isSubmitting} />}
      </Box>
    </Container>
  );
}

export default EditPatientPage;