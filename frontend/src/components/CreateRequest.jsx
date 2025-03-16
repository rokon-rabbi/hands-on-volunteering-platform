import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRequest() {
    const [form, setForm] = useState({ title: "", description: "", urgency: "LOW" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8080/api/help-requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(form),
        });
        navigate("/help-requests");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create Help Request</h2>
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <select
                    className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="URGENT">Urgent</option>
                </select>
                <button className="bg-blue-500 text-white px-4 py-2 w-full">Submit</button>
            </form>
        </div>
    );
}

export default CreateRequest;
