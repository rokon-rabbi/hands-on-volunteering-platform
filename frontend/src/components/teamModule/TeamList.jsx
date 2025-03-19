import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamList = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("http://localhost:8080/api/teams", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);

    const handleJoinTeam = async (teamId, privacy) => {
        if (privacy === "PRIVATE") {
            alert("This is a private team. You need an invitation to join.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            await axios.post(`http://localhost:8080/api/teams/${teamId}/join`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Joined team successfully!");
            setTeams((prevTeams) =>
                prevTeams.map((team) =>
                    team.id === teamId
                        ? { ...team, members: [...team.members, { username: "You" }] }
                        : team
                )
            );
        } catch (error) {
            alert(error.response?.data?.error || "Error joining team.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Teams</h1>
            {teams.length === 0 ? (
                <p>No teams found.</p>
            ) : (
                <ul className="space-y-4">
                    {teams.map((team) => (
                        <li key={team.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{team.name}</h2>
                            <p>Privacy: {team.privacy}</p>
                            <p>Members: {team.members.map((m) => m.username).join(", ")}</p>
                            <button
                                onClick={() => handleJoinTeam(team.id, team.privacy)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            >
                                Join Team
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeamList;
