// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    // If no token exists, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; // If token exists, show the page content
}

export default ProtectedRoute;