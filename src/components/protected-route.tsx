import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteType = {
    children: ReactNode;     
    requiredRole: string;
}

const ProtectedRoute : FC<ProtectedRouteType> = ({ children, requiredRole }) => {
    const auth = useAuth();

    if (auth?.currentUser?.userRole !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;