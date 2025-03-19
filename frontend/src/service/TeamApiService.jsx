import axios from "axios";

const API_URL = "http://localhost:8080/api/teams"; // Adjust based on backend

// Fetch all teams
const fetchTeams = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Fetch team details
const getTeamDetails = async (teamId) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

// Create a new team
const createTeam = async (teamData, token) => {
    const response = await axios.post(API_URL, teamData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Join a team
const joinTeam = async (teamId, token) => {
    const response = await axios.post(`${API_URL}/${teamId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const TeamApiService = {
    fetchTeams,
    getTeamDetails,
    createTeam,
    joinTeam
};

export default TeamApiService;
