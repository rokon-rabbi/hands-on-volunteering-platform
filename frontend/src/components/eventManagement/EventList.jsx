import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({ category: "", location: "", type: "all" });
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, [filters]);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from localStorage
            if (!token) {
                console.error("No authentication token found");
                return;
            }

            let url = "http://localhost:8080/api/events";
            if (filters.category || filters.location || filters.type !== "all") {
                url += `?category=${filters.category}&location=${filters.location}&type=${filters.type}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ Add Authorization token
                    "Content-Type": "application/json"
                }
            });

            setEvents(response.data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Discover Volunteer Events</h2>

            {/* Filters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <select name="category" onChange={handleFilterChange} className="p-2 border rounded-md">
                    <option value="">All Categories</option>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                </select>

                <input
                    type="text"
                    name="location"
                    placeholder="Search by location"
                    onChange={handleFilterChange}
                    className="p-2 border rounded-md"
                />

                <select name="type" onChange={handleFilterChange} className="p-2 border rounded-md">
                    <option value="all">All Events</option>
                    <option value="event">Fixed-Date Events</option>
                    <option value="help">Ongoing Help Requests</option>
                </select>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-2 gap-4">
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
