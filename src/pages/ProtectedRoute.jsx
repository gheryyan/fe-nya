// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;