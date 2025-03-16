import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HelpRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/help-requests", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setRequests(data));
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Help Requests</h1>
                <Link
                    to="/create-helpRequest"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block"
                >
                    + New Request
                </Link>
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div
                            key={req.id}
                            className="bg-white p-4 rounded-lg shadow flex justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-bold">{req.title}</h2>
                                <p className="text-gray-600">{req.description}</p>
                                <p className="text-sm text-red-500">Urgency: {req.urgency}</p>
                            </div>
                            <Link to={`/request/${req.id}`} className="text-blue-500">
                                View Details →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HelpRequests;
