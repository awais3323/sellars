import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./pendingOrder.css";

const PendingOrder = React.memo(( props) => {
  let { modes } = useSelector((state) => state.DarkMode);
  const {orders} = props
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
           Order Id : <span className="no_orange"> {orders._id}</span>
          </p>
          <p className="statusNumber pend_para">
            {" "}
            <span className="no_orange">
              {orders.orderStatus.toUpperCase()}
            </span>
          </p>
        </div>
        <div className="Second_pedningDiv">
        <p className="pend_para">
            <span className="no_orange">Order Date : {orders.createdAt}</span>
          </p>
          <div className="statusLine" id="statusLiner" style={{backgroundColor:`${orders.orderStatus === "pending"? "red" :`${orders.orderStatus === "packed" ?"orange":"#CA82FF"}`}` }}></div>
          
        </div>
      </div>
    </>
  );
});

export default PendingOrder;
