import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Swal from 'sweetalert2';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const { user } = useAuth();
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        fetchEventDetails();
    }, [eventId]);

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage.");
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/api/events/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setEvent(response.data);

            // Check if the user has already joined
            if (response.data.attendees && response.data.attendees.includes(user.email)) {
                setJoined(true);
                localStorage.setItem(`event_${eventId}_joined`, "true"); // Save to localStorage
            }
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    };

    const joinEvent = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage.");
                return;
            }

            const response = await axios.post(
                `http://localhost:8080/api/events/${eventId}/join`,
                { user: user.email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'You have successfully joined the event!',
                });

                // Update state and persist it in localStorage
                setJoined(true);
                localStorage.setItem(`event_${eventId}_joined`, "true");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong while joining the event. Please try again!',
            });
            console.error("Error joining event:", error);
        }
    };

    useEffect(() => {
        // Check if the user has already joined the event after component mount
        const joinedStatus = localStorage.getItem(`event_${eventId}_joined`);
        if (joinedStatus === "true") {
            setJoined(true);
        }
    }, [eventId]);

    if (!event) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.location} • {new Date(event.dateTime).toLocaleString()}</p>
            <p className="mt-4">{event.description}</p>
            <button
                onClick={joinEvent}
                disabled={joined}
                className={`mt-4 p-2 ${joined ? 'bg-gray-500' : 'bg-green-500'} text-white rounded-md`}
            >
                {joined ? "Joined" : "Join Event"}
            </button>
        </div>
    );
};

export default EventDetails;
