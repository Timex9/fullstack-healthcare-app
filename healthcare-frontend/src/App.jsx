// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all page components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AddPatientPage from './pages/AddPatientPage';
import PatientDetailPage from './pages/PatientDetailPage';
import EditPatientPage from './pages/EditPatientPage'; // <-- Add this missing import

// Import utility components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/add-patient" element={<ProtectedRoute><AddPatientPage /></ProtectedRoute>} />
        <Route path="/patients/:patientId" element={<ProtectedRoute><PatientDetailPage /></ProtectedRoute>} />
        <Route path="/patients/:patientId/edit" element={<ProtectedRoute><EditPatientPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;