import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
export default function Register(){
    const {handleLogin}=useAuth()
    const navigate=useNavigate()
    const [form,setForm]=useState({
        email:"",
        password:'',
    })
    const [serverErrors,setServerErrors]=useState(null)
    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
        if(serverErrors){
            setServerErrors(null)
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const formData={
            email:form.email,
            password:form.password,
        }
        try{
            const response=await axios.post('http://localhost:3456/login',formData)
            localStorage.setItem('token',response.data.token)
            const userResponse = await axios.get('http://localhost:3456/account', { 
                headers : {
                    Authorization: localStorage.getItem('token')
                }
            })
            handleLogin(userResponse.data)
            //console.log(userResponse.data)
            navigate('/home')
            setForm(response.data)
            setServerErrors(null)

        }catch(err){
            console.log(err)
            setServerErrors(err?.response?.data?.errors)
            //console.log(serverErrors)
            setForm({
                email: '',
                password: '',
            })

        }
      
    }
    const displayErrors = (field) => {
        if (!serverErrors) return null; // Return null if there are no errors
        
        if (typeof serverErrors === 'string') {
            // If serverErrors is a string, display it as a single error message
            return <span style={{ color: 'red' }}>{serverErrors}</span>;
        }
    
        // If serverErrors is an array, filter and map the errors
        return serverErrors.filter(error => error.path === field)?.map((ele, i) => (
            <span key={i} style={{ color: 'red' }}><li>{ele.msg}</li></span>
        ));
    };
    
    
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label><br/>
                <input
                type='text'
                id='email'
                value={form.email}
                name="email"
                onChange={handleChange}
                /><br/>
                {displayErrors('email')}<br/>
                <label htmlFor="password">Password</label><br/>
                <input
                type='password'
                id='password'
                value={form.password}
                name="password"
                onChange={handleChange}
                /><br/>
                {displayErrors('password')}<br/>
                <input type='submit'/>
            </form>
        </div>
    )
}