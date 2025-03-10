import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Ensure app waits before rendering

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("AuthContext - Token from localStorage:", token);

        if (token) {
            axios.get("http://localhost:8080/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    console.log("AuthContext - Fetched user data:", res.data);
                    setUser(res.data);
                })
                .catch((error) => {
                    console.error("AuthContext - Error fetching user:", error);
                    setUser(null);
                })
                .finally(() => {
                    console.log("AuthContext - Setting loading to false");
                    setLoading(false);
                });
        } else {
            console.log("AuthContext - No token found, setting loading to false");
            setLoading(false);
        }
    }, []);



    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);

            // Fetch user profile after login
            const profileRes = await axios.get("http://localhost:8080/api/users/profile", {
                headers: { Authorization: `Bearer ${res.data.token}` },
            });
            setUser(profileRes.data);

            return profileRes.data; // Return user data for navigation
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children} {/* ✅ Prevent rendering until loading is complete */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
