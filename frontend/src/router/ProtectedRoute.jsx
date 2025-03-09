import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

    return <Outlet />;
};


export const UserRoute = () => <ProtectedRoute allowedRoles={["USER"]} />;
export const AdminRoute = () => <ProtectedRoute allowedRoles={["ADMIN"]} />;
export const SuperAdminRoute = () => <ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />;

export default ProtectedRoute;
