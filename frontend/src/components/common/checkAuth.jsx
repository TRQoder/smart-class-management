import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const role = user?.role?.toUpperCase();

    // Not logged in → redirect to login if trying to access protected routes
    if (!isAuthenticated && !path.includes("/login") && !path.includes("/register")) {
        return <Navigate to='/auth/login' />;
    }

    // Already logged in → prevent accessing login/register pages
    if (isAuthenticated && (path.includes("/login") || path.includes("/register") || path.includes("/auth"))) {
        if (role === 'ADMIN') return <Navigate to='/admin/dashboard' />;
        if (role === 'FACULTY') return <Navigate to='/faculty/dashboard' />;
        if (role === 'STUDENT') return <Navigate to='/student/home' />;
    }

    // Role-based access restrictions
    if (isAuthenticated) {
        // ADMIN can access everything, redirect FACULTY/STUDENT away from admin routes
        if (path.includes("/admin") && role !== 'ADMIN') {
            return <Navigate to='/unauth-page' />;
        }

        // Optional: prevent users from going to other dashboards
        if (role === 'FACULTY' && path.includes("/student")) {
            return <Navigate to='/faculty/dashboard' />;
        }
        if (role === 'STUDENT' && path.includes("/faculty")) {
            return <Navigate to='/student/home' />;
        }
    }

    return <>{children}</>;
}

export default CheckAuth;
