import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
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
        const formattedData = {
            ...formData,
            skills: Array.isArray(formData.skills) ? formData.skills : formData.skills.split(",").map(skill => skill.trim()),
            causes: Array.isArray(formData.causes) ? formData.causes : formData.causes.split(",").map(cause => cause.trim()),
        };

        try {
            const response = await axios.put("http://localhost:8080/api/users/profile", formattedData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data);
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

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
