import React from 'react'
import "./AllOrder.css"
const AllOrder = React.memo((props) => {
  const {orders} = props
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
          <div className="statusLine2" id="statusLiner2" style={{backgroundColor:`${orders.orderStatus === "pending"? "pink" :`${orders.orderStatus === "packed" ?"orange":`${orders.orderStatus === "transfered" ?"#CA82FF":`${orders.orderStatus === "delivered" ?"skyblue":"red"}`}`}`}` }}></div>
          <p className="pend_para">
            <span className="no_orange"> user Id :{orders.user}</span>
          </p>
          
          <p className="pend_para">
            <span className="no_orange"> {orders.totalPrice} Rs.</span>
          </p>
        </div>
      </div>
    </>
  )
})

export default AllOrder
