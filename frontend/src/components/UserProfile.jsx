import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user)
        return <div className="text-center mt-10 text-red-500 text-lg">User not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-12">
            <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8">
                {/* Profile Header */}
                <div className="text-center">
                    <img
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1741683926~exp=1741687526~hmac=36f20139604323eb691cb25c31fd34e7fbe08690477c34669a4fa44038e66a18&w=740"
                        alt="Profile"
                        className="w-28 h-28 mx-auto rounded-full border-4 border-blue-300"
                    />
                    <h2 className="text-3xl font-semibold text-gray-800 mt-4">{user.username}</h2>
                    <p className="text-gray-600 text-lg">{user.email}</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6 space-y-4">
                    <div className="border-b pb-3">
                        <h3 className="text-lg font-semibold text-gray-700">About</h3>
                        <p className="text-gray-600">
                            {user.bio || "No bio available"}
                        </p>
                    </div>

                    <div className="border-b pb-3">
                        <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
                        {user.skills && user.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {user.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No skills added</p>
                        )}
                    </div>

                    <div className="border-b pb-3">
                        <h3 className="text-lg font-semibold text-gray-700">Causes</h3>
                        {user.causes && user.causes.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {user.causes.map((cause, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                        {cause}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No causes selected</p>
                        )}
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="px-5 py-2 text-white bg-blue-500 hover:bg-blue-600 transition rounded-md text-lg">
                        Edit Profile
                    </button>

                    <button
                        onClick={() => navigate("/profile/history")}
                        className="px-5 py-2 text-white bg-gray-700 hover:bg-gray-800 transition rounded-md text-lg">
                        View History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
