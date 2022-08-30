import React from 'react'
import "./notAllowed.css"
import { useNavigate } from 'react-router-dom';


const Notallowed = () => {
  
const navigate = useNavigate();
  // setTimeout(() => {
  //   navigate("/me")
    
  // }, 5000);
  return (
    <div className='notAllowed_div'>
      <p>You are not allowed to access this service. ❌  </p>
      <p> Please contact the Admin</p>
    </div>
  )
}

export default Notallowed
