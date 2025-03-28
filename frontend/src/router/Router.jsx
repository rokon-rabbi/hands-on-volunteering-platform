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
import UserProfile from "../components/UserProfile";
import Navbar from "../components/Navbar";
import EditProfile from "../components/EditProfile";
import VolunteerHistory from "../components/VolunteerHistory";
import Welcome from "../components/Welcome";
import CreateEvent from "../components/eventManagement/CreateEvent";
import EventList from "../components/eventManagement/EventList";
import EventDetails from "../components/eventManagement/EventDetails";
import Home from "../components/HelpRequests";
import HelpRequests from "../components/HelpRequests";
import CreateRequest from "../components/CreateRequest";
import RequestDetails from "../components/RequestDetails";
import TeamList from "../components/teamModule/TeamList";
import CreateTeam from "../components/teamModule/CreateTeam";
import TeamDetails from "../components/teamModule/TeamDetails";

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
        element: <Layout />,
        children: [
            { index: true, element: <Welcome /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "unauthorized", element: <Unauthorized /> },
            {
                path: "profile",
                element: <UserRoute />,
                children: [{ index: true, element: <UserProfile /> }],
            },
            {
                path: "profile/history",
                element: <UserRoute />,
                children: [{ index: true, element: <VolunteerHistory /> }],
            },

            {
                path: "profile/edit",
                element: <UserRoute />,
                children: [{ index: true, element: <EditProfile /> }],
            },
            {
                path: "help-requests",
                element: <UserRoute />,
                children: [{ index: true, element: <HelpRequests /> }],
            },

            {
                path: "/request/:id",
                element: <UserRoute />,
                children: [{ index: true, element: <RequestDetails /> }],
            },
            {
                path: "create-helpRequest",
                element: <UserRoute />,
                children: [{ index: true, element: <CreateRequest /> }],
            },
            {
                path: "dashboard",
                element: <UserRoute />,
                children: [{ index: true, element: <UserDashboard /> }],
            },
            {
                path: "/create-event",
                element: <UserRoute />,
                children: [{ index: true, element: <CreateEvent /> }],
            },
            {
                path: "event/:eventId",
                element: <UserRoute />,
                children: [{ index: true, element: <EventDetails /> }],
            },
            {
                path: "events",
                element: <UserRoute />,
                children: [{ index: true, element: <EventList /> }],
            },
            // Team Routes -->

            {
                path: "/teams",
                element: <UserRoute />,
                children: [{ index: true, element: <TeamList /> }],
            },
            {
                path: "/create-team",
                element: <UserRoute />,
                children: [{ index: true, element: <CreateTeam /> }],
            },
            {
                path: "/teams/:teamId",
                element: <UserRoute />,
                children: [{ index: true, element: <TeamDetails /> }],
            },
            {
                path: "admin",
                element: <AdminRoute />,
                children: [{ index: true, element: <AdminPanel /> }],
            },
            {
                path: "super-admin",
                element: <SuperAdminRoute />,
                children: [{ index: true, element: <SuperAdminPanel /> }],
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;

