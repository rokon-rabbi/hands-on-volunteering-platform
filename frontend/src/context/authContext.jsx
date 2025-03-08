import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get(`${API_BASE_URL}/me`)
                .then(({ data }) => setUser(data))
                .catch(() => logout());
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_BASE_URL}/login`, { email, password });
            localStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            const res = await axios.get(`${API_BASE_URL}/me`);
            setUser(res.data);

            console.log("Login successful:", res.data);
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
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
