import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        skills: [],
        causes: [],
    });

    useEffect(() => {
        if (!user) return;
        setProfile(user);
        setFormData({
            username: user.username || "",
            email: user.email || "",
            skills: user.skills || [],
            causes: user.causes || [],
        });
        console.log("User Data in Profile:", user);
    }, [user]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!profile) return <div className="text-center mt-10 text-red-500">User not found.</div>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === "skills" || name === "causes" ? value.split(",") : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put("http://localhost:8080/api/users/profile", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                console.log("Updated Profile:", response.data);
                setProfile(response.data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">{isEditing ? "Edit Profile" : "User Profile"}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills.join(", ")}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Causes (comma separated)</label>
                    <input
                        type="text"
                        name="causes"
                        value={formData.causes.join(", ")}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-between">
                    {isEditing ? (
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Save Changes
                        </button>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 bg-green-500 text-white rounded-md">
                            Edit Profile
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserProfile;
