import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RequestDetails() {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem("token"); // Retrieve JWT token
    console.log(comment);
    console.log(comments);
    useEffect(() => {
        if (!token) {
            alert("Please log in to continue.");
            window.location.href = "/login";
            return;
        }

        fetch(`http://localhost:8080/api/help-requests/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setRequest(data))
            .catch((err) => console.error("Error fetching request:", err));

        fetch(`http://localhost:8080/api/help-requests/${id}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setComments(data))
            .catch((err) => console.error("Error fetching comments:", err));
    }, [id, token, comment]);

    const postComment = async () => {
        if (!comment.trim()) return;
        try {
            const response = await fetch(`http://localhost:8080/api/help-requests/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(comment), // Send comment as a raw string
            });

            if (!response.ok) throw new Error("Failed to post comment");

            setComment("");
            setComments([...comments, { comment }]); // Update UI instantly
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return request ? (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold">{request.title}</h1>
            <p>{request.description}</p>

            <h2 className="mt-4 text-lg font-semibold">Comments</h2>
            {comments.map((c, i) => (
                <p key={i} className="bg-gray-100 p-2 mt-2 rounded">
                    <span className="font-semibold">{c.username}: </span>{c.comment}
                </p>
            ))}

            <textarea
                className="border p-2 mt-4 w-full"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                onClick={postComment}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
                Comment
            </button>
        </div>
    ) : null;
}

export default RequestDetails;
