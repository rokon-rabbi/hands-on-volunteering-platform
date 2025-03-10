import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Prevents white screen during auth check

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
