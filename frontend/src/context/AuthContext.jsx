import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const syncAuth = (event) => {
            if (event.key === "user") {
                const newUser = event.newValue ? JSON.parse(event.newValue) : null;
                setUser(newUser);
            }
        };

        window.addEventListener("storage", syncAuth);
        return () => window.removeEventListener("storage", syncAuth);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                console.error("Login failed!");
                return null;
            }

            const data = await response.json();
            const { token, username, role } = data;
            const newUser = { username, email, role };
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);

            return newUser;
        } catch (error) {
            console.error("Error during login:", error);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
