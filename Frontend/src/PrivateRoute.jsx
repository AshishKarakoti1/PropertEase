import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Check if the user is authenticated by checking for a token
    const isAuthenticated = !!localStorage.getItem('token');
    console.log('Authenticated:', isAuthenticated); // Debugging line
    // If authenticated, render the child components (using Outlet)
    // Otherwise, redirect to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
