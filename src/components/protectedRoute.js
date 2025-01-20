import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // Redirect to Login if the user is not authenticated
    return <Navigate to="/Login" />;
  }
  return children;
};

export default ProtectedRoute;
