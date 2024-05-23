import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export default function Register(){
    const navigate=useNavigate()
    const [form,setForm]=useState({
        username:'',
        email:"",
        password:'',
        role:''
    })
    const [serverErrors,setServerErrors]=useState(null)
    const [checkEmail,setCheckEmail]=useState({})
    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
        if(serverErrors){
            setServerErrors(null)
        }
    }
    const handleEmail=async()=>{
        const response =await axios.get(`http://localhost:3456/checkemail/?email=${form.email}`)
       // console.log(response.data)
        setCheckEmail(response.data)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const formData={
            username:form.username,
            email:form.email,
            password:form.password,
            role:form.role
        }
        try{
            const response=await axios.post('http://localhost:3456/register',formData)
            //console.log(response.data)
            setForm(response.data)
            setServerErrors(null)
            navigate('/login')

        }catch(err){
            console.log(err)
            setServerErrors(err?.response?.data?.errors)
            //console.log(serverErrors)
            setForm({
                username: '',
                email: '',
                password: '',
                role: ''
            })

        }
      
    }
    const displayErrors = (field) => {
        return serverErrors && serverErrors.filter(error => error.path === field)?.map((ele, i) => {
            return <span key={i} style={{ color: 'red' }}><li>{ele.msg}</li></span>
        });
    };
    
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label><br/>
                <input
                type='text'
                id='username'
                value={form.username}
                name="username"
                onChange={handleChange}
                /><br/>
                {displayErrors('username')}<br/>
                <label htmlFor="email">Email</label><br/>
                <input
                type='text'
                id='email'
                value={form.email}
                name="email"
                onChange={handleChange}
                onBlur={handleEmail}
                /><br/>
                {displayErrors('email')}<br/>
                {checkEmail.status===true && <span>Email already exists</span>}<br/>
                <label htmlFor="password">Password</label><br/>
                <input
                type='password'
                id='password'
                value={form.password}
                name="password"
                onChange={handleChange}
                /><br/>
                {displayErrors('password')}<br/>
                <label>Role:</label>
                <input                
                type='radio'
                value='candidate'
                id='candidate'
                name='role'
                checked={form.role==='candidate'}
                onChange={handleChange}
                />
                <label htmlFor="candidate">Candidate</label>
                <input                
                type='radio'
                value='recruiter'
                id='recruiter'
                name='role'
                checked={form.role==='recruiter'}
                onChange={handleChange}
                />
                <label htmlFor="recruiter">recruiter</label><br/>
                {displayErrors('role')}<br/>
                <input type='submit'/>
                
            </form>
        </div>
    )
}