import { useEffect, useState } from "react";
import axios from "axios";

const VolunteerHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Unauthorized: Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    "http://localhost:8080/api/users/profile/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setHistory(response.data.volunteerHistory);
            } catch (err) {
                setError("Failed to load history. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    My Volunteer Contributions
                </h2>

                {loading && <p className="text-center text-gray-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {history.map((activity) => (
                        <div
                            key={activity.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 duration-300"
                        >

                            <div className="bg-blue-500 text-white py-4 px-6 flex items-center">

                                <div>
                                    <p className="font-semibold">{activity.user.username}</p>
                                    <p className="text-sm opacity-80">{activity.user.email}</p>
                                </div>
                            </div>


                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {activity.cause}
                                </h3>
                                <p className="text-gray-600 mt-2">{activity.description}</p>

                                <p className="text-sm text-gray-500 mt-4">
                                    <span className="font-medium">Date:</span>{" "}
                                    {new Date(activity.dateParticipated).toLocaleDateString()}
                                </p>


                                <div className="mt-4">
                                    <p className="font-medium text-gray-700">Skills:</p>
                                    <div className="flex flex-wrap mt-1">
                                        {activity.user.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full m-1"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="font-medium text-gray-700">Causes:</p>
                                    <div className="flex flex-wrap mt-1">
                                        {activity.user.causes.map((cause, index) => (
                                            <span
                                                key={index}
                                                className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full m-1"
                                            >
                                                {cause}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerHistory;
