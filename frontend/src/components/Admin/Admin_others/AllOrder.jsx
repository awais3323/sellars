import React from 'react'
import "./AllOrder.css"
const AllOrder = ({orders}) => {
  return (
    <>
      <div className="mainPendingDiv fullDivSize">
        <div className="First_pedningDiv">
          <p className="pend_para">
            <span className="no_orange"> {orders._id}</span>
          </p>
          <p className="pend_para">
            <span className="no_orange"> {orders.orderItems[0].name}</span>
          </p>
          
        <p className="pend_para">
            <span className="no_orange">{orders.createdAt}</span>
          </p>
          <p className="statusNumber pend_para">
            {" "}
            <span className="no_orange">
              {orders.orderStatus.toUpperCase()}
            </span>
          </p>
          <div className="statusLine2" id="statusLiner2" style={{backgroundColor:`${orders.orderStatus === "pending"? "red" :`${orders.orderStatus === "packed" ?"orange":`${orders.orderStatus === "transfered" ?"#CA82FF":"#3AB4F2"}`}`}` }}></div>
          <p className="pend_para">
            <span className="no_orange"> {orders.itemsPrice}</span>
          </p>
          <p className="pend_para">
            <span className="no_orange"> {orders.totalPrice}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default AllOrder
