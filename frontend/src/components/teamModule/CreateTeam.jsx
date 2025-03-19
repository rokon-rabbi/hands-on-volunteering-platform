import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTeam = () => {
    const [name, setName] = useState("");
    const [privacy, setPrivacy] = useState("PUBLIC");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // Get token from local storage

        try {
            const response = await axios.post(
                "http://localhost:8080/api/teams",
                { name, privacy },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Team created successfully!");
            navigate("/");
        } catch (error) {
            alert("Error creating team: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create Team</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Team Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Privacy</label>
                    <select
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="PUBLIC">Public</option>
                        <option value="PRIVATE">Private</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                >
                    Create Team
                </button>
            </form>
        </div>
    );
};

export default CreateTeam;
