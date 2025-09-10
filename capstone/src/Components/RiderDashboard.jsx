import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../firebase';

function RiderDashboard() {


  const handleLogout = async () => {
          await logoutUser();
          navigate('/login')};
  
  return (
    <>
    <h1>Rider Dashboard</h1>
     <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default RiderDashboard