// src/api/apiClient.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // The address of your Django backend
});

export default apiClient;