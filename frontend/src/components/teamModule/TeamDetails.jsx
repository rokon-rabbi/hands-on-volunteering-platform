import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeamDetails = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`http://localhost:8080/api/teams/${teamId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTeam(response.data);
            } catch (error) {
                console.error("Error fetching team:", error);
            }
        };

        fetchTeam();
    }, [teamId]);

    if (!team) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <p>Privacy: {team.privacy}</p>
            <p>Created At: {new Date(team.createdAt).toLocaleString()}</p>
            <h2 className="text-xl font-semibold mt-4">Members:</h2>
            <ul>
                {team.members.map((member) => (
                    <li key={member.id}>{member.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeamDetails;
