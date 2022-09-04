import React ,{useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./userCard.css"
const UserCard = (props) => {
    const {user} =props
    const [date, setdate] = useState("")
  let { modes } = useSelector((state) => state.DarkMode);

    useEffect(() => {
        var root = document.querySelector(":root");
        if (modes) {
          root.style.setProperty("--customColorcon", "#212429");
          root.style.setProperty("--customColorcon_font", "white");
        } else {
          root.style.setProperty("--customColorcon", "rgba(196, 215, 224, 0.31)");
          root.style.setProperty("--customColorcon_font", "#212429");
        }
      }, [modes]);
      useEffect(()=>{
        filterdate()
      },[user.createdAt])
      function filterdate() {
        let usercr = user.createdAt.split("-");
        let exdate = `${usercr[2].slice(0, 2)} - ${usercr[1]} - ${usercr[0]}`;
        setdate(exdate)
      }
  return (
    
    <>
    <div className="user_Card">
        <div className="user_img_box">
            <img src={user.avatar.url} alt="pic" className="user_Image"/>
        </div>
        <div className="detailsdiv">

        <div className="user_name divpad">
            <p>Name: <span className='coloror'>{user.name}</span></p>
        </div>
        <div className="user_role divpad">
            <p>Role: <span className='coloror'>{user.role}</span></p>

        </div>
        <div className="user_id divpad">
            <p>Id: <span className='coloror'>{user._id}</span></p>

        </div>
        <div className="user_email divpad">
            <p>Email: <span className='coloror'>{user.email}</span></p>
        </div>
        <div className="user_date divpad">
            <p>Since: <span className='coloror'>{date}</span></p>
        </div>
        </div>
    </div>
      
    </>
  )
}

export default UserCard
