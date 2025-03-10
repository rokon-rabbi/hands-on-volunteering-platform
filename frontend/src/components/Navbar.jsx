import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <NavLink to="/" className="text-xl font-bold">Voluntr</NavLink>

            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">{user.username}</span>
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <NavLink to="/login" className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-800">Login</NavLink>
                        <NavLink to="/register" className="px-3 py-1 bg-green-500 rounded hover:bg-green-600">Register</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
