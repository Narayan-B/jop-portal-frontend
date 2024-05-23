import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ApplyJob() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [checkApplied, setCheckApplied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:3456/single-job/${id}`);
                setJob(response.data);
                
                // Check if job is already applied
                const applied = await axios.get(`http://localhost:3456/check-applied?id=${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log(applied)
                setCheckApplied(applied.data.applied)
            } catch (err) {
                console.error(err);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if(!checkApplied){
            const form = { job: id };
        try {
            const response = await axios.post(`http://localhost:3456/apply-job`, form, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            setJob(response.data);
            setCheckApplied(true)
        } catch (err) {
            console.error(err);
        }
            
        }
        
    };

    return (
        <div>
            <h1>Apply job-{job&& job.length}</h1>
            {job && (
                <>
                    <h6>Title: {job.title}</h6>
                    <h6>Description: {job.description}</h6>
                    <h6>Openings: {job.openings}</h6>
                    <h6>Location: {job.location ? job.location.join(',') : ''}</h6>
                    <h6>Job Type: {job.jobType}</h6>
                    <h6>Min Experience: {job.experience?.minExp}</h6>
                    <h6>Max Experience: {job.experience?.maxExp}</h6>
                    <h6>Skills: {job.skills}</h6>
                    <h6>Min Salary: {job.salary?.minSalary}</h6>
                    <h6>Max Salary: {job.salary?.maxSalary}</h6>
                    <h6>Due Date: {job.dueDate}</h6>
                    {checkApplied===true ? (
                        <h4 style={{color:'green'}}>Already applied for this job</h4>
                    ) : (
                        <button onClick={handleApply}>Apply</button>
                    )}
                </>
            )}
        </div>
    );
}
