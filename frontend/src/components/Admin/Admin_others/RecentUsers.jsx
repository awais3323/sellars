import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./pendingOrder.css";

const RecentUsers = React.memo(({ users }) => {
  let { modes } = useSelector((state) => state.DarkMode);

  var root = document.querySelector(":root");
useEffect(() => {
    if (modes) {
      root.style.setProperty("--customColorcon", "#212429");
      root.style.setProperty("--customColorcon_font", "white");
    } else {
      root.style.setProperty("--customColorcon", "RGB(245, 249, 252)");
      root.style.setProperty("--customColorcon_font", "#212429");
    }
  }, [modes]);


  return (
    <>
      <div className="mainPendingDiv">
        <div className="First_pedningDiv">
          <p className="pend_para">
           Order Name : <span className="no_orange"> {users.name}</span>
          </p>
          <p className="statusNumber pend_para">
            {" "}
            <span className="no_orange">
              {users._id}
            </span>
          </p>
        </div>
        <div className="Second_pedningDiv">
        <p className="pend_para">
            <span className="no_orange">Order Role : {users.role}</span>
          </p>
        <p className="pend_para">
            <span className="no_orange">Order Date : {users.createdAt}</span>
          </p>
          {/* <div className="statusLine" id="statusLiner" style={{backgroundColor:`${orders.orderStatus === "pending"? "red" :`${orders.orderStatus === "packed" ?"orange":"#CA82FF"}`}` }}></div> */}
          
        </div>
      </div>
    </>
  );
});

export default RecentUsers;
