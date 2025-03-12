import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ category: "", location: "", type: "all" });
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, [filters]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found");
                return;
            }

            let url = "http://localhost:8080/api/events";

            const params = [];
            if (filters.category) params.push(`category=${filters.category}`);
            if (filters.location) params.push(`location=${filters.location}`);
            if (filters.type !== "all") params.push(`type=${filters.type}`);

            if (params.length > 0) {
                url += `?${params.join("&")}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            setEvents(response.data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Discover Volunteer Events</h2>


            <div className="grid grid-cols-3 gap-4 mb-6">
                <select name="category" onChange={handleFilterChange} value={filters.category} className="p-2 border rounded-md">
                    <option value="">All Categories</option>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Community">Community</option>
                </select>

                <input
                    type="text"
                    name="location"
                    value={filters.location}
                    placeholder="Search by location"
                    onChange={handleFilterChange}
                    className="p-2 border rounded-md"
                />

                <select name="type" onChange={handleFilterChange} value={filters.type} className="p-2 border rounded-md">
                    <option value="all">All Events</option>
                    <option value="event">Fixed-Date Events</option>
                    <option value="help">Ongoing Help Requests</option>
                </select>
            </div>

            {loading && <div className="text-center text-lg text-gray-600">Loading events...</div>}

            <div className="grid grid-cols-2 gap-4">
                {!loading && events.length === 0 && (
                    <div className="text-center text-lg text-gray-600">No events found for the selected filters.</div>
                )}
                {events.map((event) => (
                    <div key={event.eventId} className="p-4 border rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <p className="text-gray-600">{event.location} • {new Date(event.date).toLocaleString()}</p>
                        <p className="mt-2 text-sm">{event.category}</p>
                        <button
                            onClick={() => navigate(`/event/${event.eventId}`)}
                            className="mt-3 p-2 bg-blue-500 text-white rounded-md"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
