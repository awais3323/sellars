import React from 'react'
import "./notAllowed.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Notallowed = () => {
  const { modes } = useSelector((state) => state.DarkMode);

  
const navigate = useNavigate();
  // setTimeout(() => {
  //   navigate("/me")
    
  // }, 5000);
  return (
    <div className='notAllowed_div' style={{color:`${modes?"white":"black"}`}}>
      <p>You are not allowed to access this service. ❌  </p>
      <p> Please contact the Admin</p>
      <Link to={"/me"} className="directingBtn">Go Back</Link>
    </div>
  )
}

export default Notallowed
