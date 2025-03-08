import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/register", { username, email, password });
            navigate("/login");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister} className="p-8 bg-white shadow-md rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="mb-2 p-2 w-full border" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 p-2 w-full border" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-2 p-2 w-full border" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Register</button>
            </form>
        </div>
    );
};

export default Register;
