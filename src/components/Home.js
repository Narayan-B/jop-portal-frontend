import { useAuth } from "../context/AuthContext"
 export default function Home(){
    const {user}=useAuth()
    //console.log(user)
    return(
        <div>
            <h1>Home</h1>
            {user ? <h4>Welcome {user.username} </h4>: <p>No user found pleaser login </p>}
        </div>
    )
}