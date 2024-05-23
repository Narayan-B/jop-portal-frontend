import {Link,Routes,Route} from 'react-router-dom'
import axios from 'axios'
import {useEffect} from 'react'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account'
import PrivateRoute from './components/PrivateRoute'
import {useAuth} from './context/AuthContext'
import ApplyJob from './components/ApplyJob'
import AddJob from  './components/AddJob'
import Unauthorized from './components/Unauthorized'
import MyJobs from './components/MyJobs';
import EditJob from './components/EditJob';
import MyApplications from './components/MyApplication';
import SingleApplication from './components/SingleApplication';
import AppliedJobs from './components/AppliedJobs';
import ViewJob from './components/ViewJob';
export default function App() {
  const {user,handleLogin,handleLogout} =useAuth()
  const conditionalLinks = () => {
    if (user && (user.role === 'recruiter' || user.role === 'candidate')) {
      return (
        <>
          {user.role === 'recruiter' && 
          <>
           <Link to='/add-job'>Add Job|</Link>
          <Link to='/my-jobs'>My jobs|</Link>
          </>
         
          }
          {user.role === 'candidate' &&
          <>
          <Link to='/view-jobs'>View Jobs|</Link>
          <Link to='/applied-jobs'>Applied Jobs|</Link>
          </> 
          }
        </>
      );
    }
    return null;
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      (async()=>{
        const response=await axios.get('http://localhost:3456/account',{
          headers:{
            authorization:localStorage.getItem('token')
          }
        })
        handleLogin(response.data)
      })();
    }

  },[])
  return (
    <div>
      <h1>Job Portal</h1>
     
      <Link to='/home'>Home|</Link>
      {!user && 
      <>
      <Link to='/register'>Register|</Link>
       <Link to='/login'>Login|</Link>

      </>
      }
      {user &&
      <>
      <Link to='/account'>Account|</Link>
      {conditionalLinks()}
      
      <Link to='/home' onClick={() => {
              localStorage.removeItem('token')
              handleLogout()
            }}>Logout</Link>
      
      </>
      }
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path ='/unauthorized' element ={<Unauthorized/>}/>
        <Route path ='/account' element={<PrivateRoute permittedRoles={['recruiter', 'candidate']}>
              <Account />
          </PrivateRoute>} />
          <Route path ='/apply-job/:id' element={<PrivateRoute permittedRoles={['candidate']}>
              <ApplyJob />
          </PrivateRoute>} />
          <Route path ='/view-jobs/' element={<PrivateRoute permittedRoles={['candidate']}>
              <ViewJob />
          </PrivateRoute>} />
          
          <Route path ='/add-job' element={<PrivateRoute permittedRoles={['recruiter']}>
              <AddJob />
          </PrivateRoute>} />
          <Route path ='/my-jobs' element={<PrivateRoute permittedRoles={['recruiter']}>
              <MyJobs />
          </PrivateRoute>} />
          <Route path ='/edit-job/:id' element={<PrivateRoute permittedRoles={['recruiter']}>
              <EditJob />
          </PrivateRoute>} />
          <Route path ='/my-applications/:id' element={<PrivateRoute permittedRoles={['recruiter']}>
              <MyApplications />
          </PrivateRoute>} />
          <Route path ='my-single-application/:id' element={<PrivateRoute permittedRoles={['recruiter']}>
              <SingleApplication />
          </PrivateRoute>} />
          <Route path ='applied-jobs' element={<PrivateRoute permittedRoles={['candidate']}>
              <AppliedJobs />
          </PrivateRoute>} />
      </Routes>
      
    </div>
    
  );
}


