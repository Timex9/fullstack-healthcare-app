// src/components/PatientForm.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, CircularProgress } from '@mui/material';

function PatientForm({ onSubmit, initialData = {}, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    first_name: initialData.first_name || '',
    last_name: initialData.last_name || '',
    date_of_birth: initialData.date_of_birth || '',
    gender: initialData.gender || 'Other',
    address: initialData.address || '',
    contact_number: initialData.contact_number || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField margin="normal" required fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Date of Birth" name="date_of_birth" type="date" InputLabelProps={{ shrink: true }} value={formData.date_of_birth} onChange={handleChange} />
      <TextField margin="normal" required fullWidth select label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      <TextField margin="normal" required fullWidth label="Address" name="address" multiline rows={4} value={formData.address} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Contact Number" name="contact_number" value={formData.contact_number} onChange={handleChange} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={24} /> : 'Save Patient'}
      </Button>
    </Box>
  );
}

export default PatientForm;