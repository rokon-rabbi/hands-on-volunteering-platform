import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        location: "",
        category: "",
        dateTime: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        if (!eventData.title || !eventData.description || !eventData.location || !eventData.category || !eventData.dateTime) {
            setError("All fields are required!");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8080/api/events",
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            Swal.fire({
                title: "Event Created!",
                text: "Your event has been successfully created.",
                icon: "success",
                draggable: true,
                confirmButtonText: "OK"
            });
            setEventData({ title: "", description: "", location: "", category: "", dateTime: "" });
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create event.");
            console.error("Error creating event:", error);
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to create event.",
                icon: "error",
                confirmButtonText: "Try Again"
            });
        }
        setLoading(false);
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold mb-4 text-center">Create a Volunteer Event</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Title */}
                <div>
                    <label className="block font-semibold mb-1">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        placeholder="Enter event title"
                        className="p-2 border rounded-md w-full focus:outline-blue-400"
                    />
                </div>

                {/* Event Description */}
                <div>
                    <label className="block font-semibold mb-1">Event Description</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        placeholder="Provide a brief event description..."
                        className="p-2 border rounded-md w-full h-24 focus:outline-blue-400"
                    ></textarea>
                </div>

                {/* Event Location */}
                <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        placeholder="Enter event location"
                        className="p-2 border rounded-md w-full focus:outline-blue-400"
                    />
                </div>

                {/* Event Category */}
                <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        value={eventData.category}
                        onChange={handleChange}
                        className="p-2 border rounded-md w-full focus:outline-blue-400"
                    >
                        <option value="">Select Category</option>
                        <option value="Environment">🌿 Environment - Cleanup & Green Activities</option>
                        <option value="Education">📚 Education - Teaching & Mentorship</option>
                        <option value="Health">🏥 Health - Medical & Wellness Support</option>
                        <option value="Community">🤝 Community - Helping People & Awareness</option>
                    </select>
                </div>

                {/* Event Date & Time */}
                <div>
                    <label className="block font-semibold mb-1">Event Date & Time</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={eventData.dateTime}
                        onChange={handleChange}
                        className="p-2 border rounded-md w-full focus:outline-blue-400"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`p-2 w-full rounded-md text-white ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "Creating Event..." : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
