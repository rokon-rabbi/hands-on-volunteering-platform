import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) return <div className="text-center mt-10 text-red-500">User not found.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
                <img
                    src=" https://source.unsplash.com/random"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-gray-300"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{user.username}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            {/* Profile Details */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold">About</h3>
                <p className="text-gray-700">{user.bio || "No bio available"}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold">Skills</h3>
                <p className="text-gray-700">{user.skills?.join(", ") || "No skills added"}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold">Causes</h3>
                <p className="text-gray-700">{user.causes?.join(", ") || "No causes selected"}</p>
            </div>

            {/* Edit Button */}
            <div className="mt-6">
                <button
                    onClick={() => navigate("/profile/edit")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
