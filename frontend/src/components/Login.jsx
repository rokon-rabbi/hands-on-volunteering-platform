import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInUser = await login(email, password);

        if (loggedInUser) {
            navigate("/profile");
        } else {
            navigate("/register");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 p-2 w-full border" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-2 p-2 w-full border" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
            </form>
        </div>
    );
};

export default Login;
