import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();


    if (loading) return <div className="text-center text-2xl">Loading...</div>;

    if (!user || !user.role) {

        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {

        return <Navigate to="/unauthorized" replace />;
    }


    return <Outlet />;
};

export const UserRoute = () => <ProtectedRoute allowedRoles={["USER"]} />;
export const AdminRoute = () => <ProtectedRoute allowedRoles={["ADMIN"]} />;
export const SuperAdminRoute = () => <ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />;

export default ProtectedRoute;
