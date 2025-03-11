import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user } = useAuth(); // Removed setUser
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "", // Email is included in API request but remains non-editable
        skills: user?.skills?.join(", ") || "",
        causes: user?.causes?.join(", ") || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "skills" || name === "causes" ? value.split(",").map(item => item.trim()) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        console.log("🔍 Token from localStorage:", token);  // Debugging

        if (!token) {
            console.error("❌ No token found! Login again.");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,  // Ensure "Bearer " prefix
                "Content-Type": "application/json",
            },
        };

        console.log("🔍 Request Headers:", config.headers);  // Debugging

        try {
            const response = await axios.put(
                "http://localhost:8080/api/users/profile",
                formData,
                config
            );
            console.log("✅ Profile updated successfully:", response.data);
        } catch (error) {
            console.error("❌ Error updating profile:", error.response);
        }
    };




    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Email (Non-Editable) */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                    />
                </div>

                {/* Skills */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Causes */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Causes (comma separated)</label>
                    <input
                        type="text"
                        name="causes"
                        value={formData.causes}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
