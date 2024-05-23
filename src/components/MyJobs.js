import {useState,useEffect} from 'react'
import axios from 'axios'
import { useJob } from '../context/ApplicationContext';
export default function MyJobs() {
    const {handleApplications,handleEdit,handleDelete,handleView}=useJob()
    const [data,setData]=useState([])
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:3456/my-jobs', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log(response);
                setData(response.data)
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);
    

    
    return(
        <div>
            <h1>Created Jobs by me</h1>
            {data.length===0 ?<p>No jobs found .Add u r first Job </p>:
             <table border='1'>
             <thead>
                 <tr>
                     <th>Title</th>
                     <th>Description</th>
                     <th>Openings</th>
                     <th>Location</th>
                     <th>JobType</th>
                     <th>Min Experience</th>
                     <th>Max Experience</th>
                     <th>Skills</th>
                     <th>Due Date</th>
                     <th>Min Salary</th>
                     <th>Max Salary</th>
                     <th>Action</th>
                 </tr>

             </thead>
             <tbody>
                 {data.map((ele,i)=>{
                     return <tr key={i}>
                         <td>{ele.title}</td>
                         <td>{ele.description}</td>
                         <td>{ele.openings}</td>
                         <td>{ele.location.join(',')}</td>
                         <td>{ele.jobType}</td>
                         <td>{ele.experience?.minExp}</td>
                         <td>{ele.experience?.maxExp}</td>
                         <td>{ele.skills.join(',')}</td>
                         <td>{ele.dueDate}</td>
                         <td>{ele.salary?.minSalary}</td>
                         <td>{ele.salary?.maxSalary}</td>
                         <td>
                            <button onClick={()=>{handleEdit(ele._id)}}>Edit</button>
                            <button onClick={()=>{handleDelete(ele._id)}}>Delete</button>
                            <button onClick={()=>{handleApplications(ele._id)}}>Applications</button>
                            <button onClick={()=>{handleView(ele._id)}}>View Details</button>
                            </td>
                     </tr>
                 })}

             </tbody>
         </table>
            
            
            }
           
        </div>
    )
}