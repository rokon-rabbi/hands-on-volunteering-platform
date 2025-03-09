import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const SuperAdminPanel = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const { user } = useAuth();

    const handlePromoteUser = async () => {
        try {
            const response = await axios.put(
                "http://localhost:8080/api/users/promote",
                null,
                {
                    params: { email },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setMessage(response.data);
        } catch (error) {
            setMessage("Error: Unable to promote user.");
            console.error("Promotion failed", error);
        }
    };

    return (
        <div>
            <h1>Super Admin Panel</h1>
            <p>Welcome, {user.username}</p>
            <div>
                <input
                    type="email"
                    placeholder="Enter email to promote"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handlePromoteUser}>Promote to Admin</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SuperAdminPanel;
