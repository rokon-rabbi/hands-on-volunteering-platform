import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <NavLink to="/" className="text-2xl font-bold hover:text-yellow-400 transition duration-200">
                    Voluntr
                </NavLink>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>

                            <NavLink
                                to="/events"
                                className="hover:text-yellow-400 transition duration-200"
                            >
                                Events Feed
                            </NavLink>
                            <NavLink
                                to="/help-requests"
                                className="hover:text-yellow-400 transition duration-200"
                            >
                                Help Requests
                            </NavLink>
                            <NavLink
                                to="/teams"
                                className="hover:text-yellow-400 transition duration-200"
                            >
                                Teams
                            </NavLink>
                            <NavLink
                                to="/create-team"
                                className="hover:text-yellow-400 transition duration-200"
                            >
                                Create Teams
                            </NavLink>
                        </>) : ""}

                    {user ? (
                        <div className="flex items-center space-x-6">
                            <NavLink
                                to={"/profile"}
                                className="flex items-center space-x-2 hover:text-yellow-400 transition duration-200"
                            >
                                <img
                                    src="https://www.w3schools.com/w3images/avatar2.png" // You can use a default profile picture
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="font-semibold">{user.username}</span>
                            </NavLink>

                            {/* Logout Button */}
                            <button
                                onClick={logout}
                                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <NavLink
                                to="/login"
                                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-800 transition duration-200"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition duration-200"
                            >
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
