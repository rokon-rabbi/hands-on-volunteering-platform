import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router";
import Login from "../components/Login";
import Register from "../components/Register";



const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <UserDashboard /> }

]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;