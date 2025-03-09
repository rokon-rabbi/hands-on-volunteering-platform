import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
            </div>
            <button
                className="bg-red-500 text-white p-2 mt-4 rounded"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
};

export default UserDashboard;
