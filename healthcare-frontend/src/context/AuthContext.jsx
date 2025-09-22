// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  // --- START OF THE FIX ---
  // If a token was found in localStorage from a previous session,
  // set it as the default Authorization header for all future apiClient requests.
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  // --- END OF THE FIX ---

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('accessToken');
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// A custom hook to make it easy to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};