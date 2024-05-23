import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MyApplications() {
    const [myApplications, setMyApplications] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({});
    const { id } = useParams(); // This id will be the jobId

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:3456/recruiter-applications/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setMyApplications(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApplications();
    }, [id]);

    const handleStatusChange = (applicationId, candidateId, newStatus) => {
        setStatusUpdates({
            ...statusUpdates,
            [applicationId]: { status: newStatus, candidateId }
        });
    };
    
    const handleUpdateStatus = async (applicationId) => {
        const updateData = statusUpdates[applicationId];
        if (!updateData) return;
        //console.log(updateData)  // {status: 'hired', candidateId: '6648307a5f99aea5817bb7d5'}

        try {
            const response = await axios.put(
                `http://localhost:3456/update-status/${id}`, // Pass jobId in the URL
                { candidate: updateData.candidateId, status: updateData.status }, // Pass candidateId and status in the body
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            );
            // Update the local state after successful update
            setMyApplications(prevApplications =>
                prevApplications.map(app =>
                    app._id === applicationId ? { ...app, status: updateData.status } : app
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>My Applications</h1>
            {myApplications.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Candidate ID</th>
                            <th>Candidate Name</th>
                            <th>Candidate Email</th>
                            <th>Current Status</th>
                            <th>Status Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myApplications.map((ele, i) => (
                            <tr key={i}>
                                <td>{ele.candidate._id}</td>
                                <td>{ele.candidate.username}</td>
                                <td>{ele.candidate.email}</td>
                                <td>{ele.status}</td>
                                <td>
                                    <select
                                        value={statusUpdates[ele._id]?.status || ele.status}
                                        onChange={(e) => handleStatusChange(ele._id, ele.candidate._id, e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="viewed">Viewed</option>
                                        <option value="shortlisted">Shortlisted</option>
                                        <option value="notShortlisted">Not Shortlisted</option>
                                        <option value="interviewed">Interviewed</option>
                                        <option value="hired">Hired</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateStatus(ele._id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
