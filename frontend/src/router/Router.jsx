import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Outlet
} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Unauthorized from "../components/Unauthorized";
import UserDashboard from "../components/UserDashboard";
import SuperAdminPanel from "../components/SuperAdminPanel";
import NotFound from "../components/NotFound";
import { UserRoute, AdminRoute, SuperAdminRoute } from "./ProtectedRoute";
import AdminPanel from "../components/AdminPanel";
import Home from "../components/Home";
import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";

// ✅ Define Layout component here
const Layout = () => (
    <div>
        <Navbar />
        <div className="container mx-auto p-4">
            <Outlet />
        </div>
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // ✅ Now, Layout is correctly defined
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "unauthorized", element: <Unauthorized /> },
            { path: "profile", element: <UserRoute><UserProfile /></UserRoute> }, // ✅ Fix
            { path: "dashboard", element: <UserDashboard /> },
            { path: "admin", element: <AdminRoute><AdminPanel /></AdminRoute> },
            { path: "super-admin", element: <SuperAdminRoute><SuperAdminPanel /></SuperAdminRoute> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
