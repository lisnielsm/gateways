import React from 'react';
import { Navigate } from 'react-router-dom';
import srvUser from "../services/userSlice";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {

    const user = useSelector(srvUser.selector.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;