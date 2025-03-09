import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Unauthorized from "../components/Unauthorized";
import UserDashboard from "../components/UserDashboard";
import SuperAdminPanel from "../components/SuperAdminPanel";
import NotFound from "../components/NotFound";
import { UserRoute, AdminRoute, SuperAdminRoute } from "./ProtectedRoute";
import AdminPanel from "../components/AdminPanel";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/unauthorized", element: <Unauthorized /> },

    // ✅ USER-ONLY Route
    {
        path: "/dashboard",
        element: <UserRoute />,
        children: [{ path: "", element: <UserDashboard /> }]
    },

    // ✅ ADMIN-ONLY Route
    {
        path: "/admin",
        element: <AdminRoute />,
        children: [{ path: "", element: <AdminPanel /> }]
    },

    // ✅ SUPER_ADMIN-ONLY Route
    {
        path: "/super-admin",
        element: <SuperAdminRoute />,
        children: [{ path: "", element: <SuperAdminPanel /> }]
    },

    // 🔹 Catch-All Route for Unknown Pages
    { path: "*", element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
