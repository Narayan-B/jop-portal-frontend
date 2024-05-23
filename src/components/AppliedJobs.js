import { useState,useEffect } from "react"
import axios from "axios"
export default function AppliedJobs(){
    const [appliedJobs,setAppliedJobs]=useState([])
    useEffect(()=>{
        const fetchAppliedJobs=async()=>{
            const response=await axios.get('http://localhost:3456/candidate-applied',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data)
            setAppliedJobs(response.data)
        }
         fetchAppliedJobs()
    },[])
    return(
        <div>
            <h1>Applied Jobs</h1>
            <table border='1'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Skills</th>
                    </tr>

                </thead>
                <tbody>
                    {appliedJobs.map((ele,i)=>{
                        return <tr  key={i}>
                        <td>{ele.job.title}</td>
                        <td>{ele.status}</td>
                        <td>{ele.job.location.join(',')}</td>
                        <td>{ele.job.skills.join(',')}</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}