import React,{useContext} from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";
import { useEffect } from "react";
import { barContext } from "../../App";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const topload = useContext(barContext)

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/LogSign");
    } else {
      navigate("/me");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {user ? (
        <>
          <MetaData title={`${user?.name}'s profile`} />
          <div className="profileContainer">
            <div className="firstContainer">
              <img src={user?.avatar?.url} alt={user?.name} className="avatar"/>
              <Link to="/me/update" className="editProfilebtn" onClick={()=>topload()}>Edit Profile</Link>
            </div>
            <div className="SideSection">
              <div className="nameUser">
                <h4 className="headTitle">Full Name:</h4>
                <h5 className="Othertitle">{user?.name}</h5>
              </div>
              <div className="nameUser">
                <h4 className="headTitle">Email:</h4>
                <h5 className="Othertitle">{user?.email}</h5>
              </div>
              <div className="nameUser">
                <h4 className="headTitle">Joined On:</h4>
                <h5 className="Othertitle">{String(user?.createdAt).substr(0, 10)}</h5>
              </div>
              <div className="nameUser2">
                <Link to="/orders" className="LowerBtn" onClick={()=>topload()}>My Orders</Link>
                <Link to="/password/update" className="LowerBtn" onClick={()=>topload()}>Change Password</Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
