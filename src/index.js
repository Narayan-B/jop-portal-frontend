import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/ApplicationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <BrowserRouter>
        <JobProvider>
            <App />
        </JobProvider>
           
        </BrowserRouter>

    
       
    </AuthProvider>
    
  
  
  
);


