import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const RoleRoutes : React.FC = () => {
    const auth = useAuth();
    // useEffect(() => {
    //     console.log('/routes/index.js initializing');
    // }, []);

    if (!auth) {
        return <Navigate to="/login" />;
    }

    if (!auth?.userLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (auth?.currentUser?.userRole === "STAFF") {
        return <Navigate to="/subject" />;
    }

    if (auth?.currentUser?.userRole === "TECHNICAL") {
        return <Navigate to="/profile" />;
    }

    if (auth?.currentUser?.userRole === "TEACHER") {
        return <Navigate to="/exam" />;
    }

    if (auth?.currentUser?.userRole === "ADMIN") {
        return <Navigate to="/admin" />;
    }

    return <Outlet />;
}

export default RoleRoutes