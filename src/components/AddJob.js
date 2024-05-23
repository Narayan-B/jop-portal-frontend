import axios from "axios";
import { useState } from "react";
export default function AddJob() {
    const jobTypes = [
        { name: 'Work from home', value: 'wfh' },
        { name: 'Work from office', value: 'wfo' },
        { name: 'Hybrid', value: 'hybrid' }
    ];

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        openings: 0,
        location: [],
        jobType: "",
        experience: { minExp: "", maxExp: "" },
        skills: [],
        dueDate: "",
        salary: { minSalary: "", maxSalary: "" },
    });
    const [serverErrors,setServerErrors]=useState(null)
    const displayErrors = (field) => {
        return serverErrors && serverErrors.filter(error => error.path === field)?.map((ele, i) => {
            return <span key={i} style={{ color: 'red' }}><li>{ele.msg}</li></span>
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'skills') {
            setFormData({
                ...formData,
                skills: value.split(',').map(skill => skill.trim())
            });
        } else if (name === 'location') {
            setFormData({
                ...formData,
                location: value.split(',').map(loc => loc.trim())
            });
        } else if (['minExp', 'maxExp'].includes(name)) {
            setFormData({
                ...formData,
                experience: {
                    ...formData.experience,
                    [name]: value
                }
            });
        } else if (['minSalary', 'maxSalary'].includes(name)) {
            setFormData({
                ...formData,
                salary: {
                    ...formData.salary,
                    [name]: value
                }
            });
        } else {
            setFormData({...formData,[name]: value});
            setServerErrors(null)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(formData);

        try {
            const response = await axios.post('http://localhost:3456/add-job', formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            console.log(response.data);
            // setFormData({
            //     title: "",
            //     description: "",
            //     openings: 0,
            //     location: [],
            //     jobType: "",
            //     experience: { minExp: "", maxExp: "" },
            //     skills: [],
            //     dueDate: "",
            //     salary: { minSalary: "", maxSalary: "" },
            // });
        } catch (err) {
            console.log(err);
            setServerErrors(err.response.data.errors)
        }
    };

    return (
        <div>
            <h2>Add Job</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Enter title</label><br />
                <input 
                    type="text" 
                    id="title" 
                    value={formData.title} 
                    name="title" 
                    onChange={handleChange} 
                /><br />
                {displayErrors('title')}<br/>
                
                <label htmlFor="description">Description</label><br />
                <textarea 
                    id="description" 
                    value={formData.description} 
                    name="description" 
                    onChange={handleChange}
                /><br />
                {displayErrors('description')}<br/>

                <label htmlFor="openings">Openings</label><br />
                <input 
                    type="number" 
                    id="openings" 
                    value={formData.openings} 
                    name="openings" 
                    onChange={handleChange} 
                /><br />
                    {displayErrors('openings')}<br/>
                <label htmlFor="location">Location</label><br />
                <input 
                    type="text" 
                    id="location" 
                    value={formData.location.join(', ')} 
                    name="location" 
                    onChange={handleChange} 
                /><br />
                    {displayErrors('location')}<br/>
                <label htmlFor="jobType">Job Type</label><br />
                <select 
                    id="jobType" 
                    value={formData.jobType} 
                    name="jobType" 
                    onChange={handleChange}
                >
                    <option value="">Select Type</option>
                    {jobTypes.map((type, index) => (
                        <option key={index} value={type.value}>{type.name}</option>
                    ))}
                </select><br />
                {displayErrors('jobType')}<br/>
                <label htmlFor="minExp">Min Experience</label><br />
                <input 
                    type="number" 
                    id="minExp" 
                    value={formData.experience.minExp} 
                    name="minExp" 
                    onChange={handleChange} 
                /><br />
                    {displayErrors('experience.minExp')}<br/>
                <label htmlFor="maxExp">Max Experience</label><br />
                <input 
                    type="number" 
                    id="maxExp" 
                    value={formData.experience.maxExp} 
                    name="maxExp" 
                    onChange={handleChange} 
                /><br />
                    {displayErrors('experience.maxExp')}<br/>
                <label htmlFor="skills">Skills</label><br />
                <input 
                    type="text" 
                    id="skills" 
                    value={formData.skills.join(', ')} 
                    name="skills" 
                    onChange={handleChange} 
                /><br />
                    {displayErrors('skills')}<br/>
                <label htmlFor="dueDate">Due Date</label><br />
                <input 
                    type="date" 
                    id="dueDate" 
                    value={formData.dueDate} 
                    name="dueDate" 
                    onChange={handleChange}
                /><br />
                    {displayErrors('dueDate')}<br/>
                <label htmlFor="minSalary">Min Salary</label><br />
                <input 
                    type="number" 
                    id="minSalary" 
                    value={formData.salary.minSalary} 
                    name="minSalary" 
                    onChange={handleChange} 
                /><br />
                {displayErrors('salary.minSalary')}<br/>

                <label htmlFor="maxSalary">Max Salary</label><br />
                <input 
                    type="number" 
                    id="maxSalary" 
                    value={formData.salary.maxSalary} 
                    name="maxSalary" 
                    onChange={handleChange} 
                /><br />
                    {displayErrors('salary.maxSalary')}<br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
