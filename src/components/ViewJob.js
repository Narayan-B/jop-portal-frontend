import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function ViewJob(){
    const navigate=useNavigate()
   
    const [jobs,setJobs]=useState([])
    useEffect(()=>{
        const fetchJobs=async()=>{
            const response=await axios.get('http://localhost:3456/all-jobs')
            console.log(response.data)
            setJobs(response.data)
        }
        fetchJobs()

    },[])
    const handleView=async(jobId)=>{
        navigate(`/apply-job/${jobId}`)
    }

    
    return (
        <div>
            <h1>Apply for a job  </h1>
            <h3>Total Jobs-{jobs && jobs.length}</h3>
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
                 {jobs.map((ele,i)=>{
                    
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
                    
                           
                            <button onClick={()=>{handleView(ele._id)}}>View details</button>
                           
                            </td>
                     </tr>
                 })}

             </tbody>
         </table>
            
        </div>
    )
}