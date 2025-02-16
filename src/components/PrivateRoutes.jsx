import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = sessionStorage.getItem('logintoken');

    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
