import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("/api/auth/me").then(({ data }) => setUser(data)).catch(() => logout());
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post("/api/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            const res = await axios.get("/api/auth/me");
            setUser(res.data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = "";
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
