import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router";

import Login from "../components/Login";
import Register from "../components/Register";
import Unauthorized from "../components/Unauthorized";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "../components/UserDashboard";



const ProtectedRoute = ({ role }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },


    {
        path: "/dashboard",
        element: <ProtectedRoute role="USER" />,
        children: [
            { path: "", element: <UserDashboard /> },
        ],
    },


    { path: "/unauthorized", element: <Unauthorized /> },

    { path: "/", element: <Navigate to="/login" /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
