import React, { useState } from 'react';
import axios from 'axios';

const HelpRequestStatusUpdate = ({ helpRequestId, updateRequestStatus }) => {
    const [status, setStatus] = useState('PENDING');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const statusOptions = ['OPEN', 'CLOSED'];

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUpdateStatus = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token) {
            setError('No token found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/help-requests/${helpRequestId}/status`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: { status },
                }
            );

            updateRequestStatus(helpRequestId, status);
        } catch (err) {
            setError('Failed to update the status');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Update Help Request Status</h3>

            {error && <p className="text-red-500">{error}</p>}

            <div className="my-4">
                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                    className="mt-2 p-2 border rounded"
                >
                    {statusOptions.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                            {statusOption}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleUpdateStatus}
                disabled={loading}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                {loading ? 'Updating...' : 'Update Status'}
            </button>
        </div>
    );
};

export default HelpRequestStatusUpdate;
