import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useJob } from '../context/ApplicationContext';
export default function SingleApplication() {
    const {handleEdit,handleDelete}=useJob()
    const [singleApplication, setSingleApplication] = React.useState({});
    const { id } = useParams();
    React.useEffect(() => {
        const fetchSingleApplication = async () => {
            try {
                const response = await axios.get(`http://localhost:3456/my-job/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log('Response:', response.data);
                setSingleApplication(response.data);
            } catch (error) {
                console.error('Error fetching single application:', error);
            }
        };
        fetchSingleApplication();
    }, [id]);

    console.log('Single application:', singleApplication);

    return (
        <div>
            <h1>Single Application Details</h1>
            {singleApplication &&
                <>
                    <h6>Title: {singleApplication.title}</h6>
                    <h6>Description: {singleApplication.description}</h6>
                    <h6>Openings: {singleApplication.openings}</h6>
                    <h6>Location: {singleApplication.location ? singleApplication.location.join(',') : ''}</h6>
                    <h6>Job Type: {singleApplication.jobType}</h6>
                    <h6>Min Experience: {singleApplication.experience?.minExp}</h6>
                    <h6>Max Experience: {singleApplication.experience?.maxExp}</h6>
                    <h6>Skills: {singleApplication.skills}</h6>
                    <h6>Min Salary: {singleApplication.salary?.minSalary}</h6>
                    <h6>Max Salary: {singleApplication.salary?.maxSalary}</h6>
                    <h6>Due Date: {singleApplication.dueDate}</h6>
                    <button onClick={()=>{handleEdit(singleApplication._id)}}>Edit</button>
                    <button onClick={()=>{handleDelete(singleApplication._id)}}>Delete</button>
                </>

            }
        </div>
    );
}
