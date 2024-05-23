import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the JobContext
export const JobContext = createContext();

// Custom hook to use the JobContext
export const useJob = () => {
    return useContext(JobContext);
}

export const JobProvider = ({ children ,userRole}) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:3456/my-jobs', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-job/${id}`);
    };

    const handleApplications = (id) => {
        navigate(`/my-applications/${id}`);
    };

    const handleView = (id) => {
        navigate(`/my-single-application/${id}`);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this job?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:3456/delete-job/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log(response);

                // Update the state to remove the deleted job
                setData(data.filter(job => job.id !== id));
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };
    

    return (
        <JobContext.Provider value={{ handleDelete, handleEdit,handleApplications,handleView }}>
            {children}
        </JobContext.Provider>
    );
};
