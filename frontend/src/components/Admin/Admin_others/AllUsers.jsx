import React from 'react'
import "./AllOrder.css"
const AllUsers = ({users}) => {
  return (
    <>
      <div className="mainPendingDiv fullDivSize">
        <div className="First_pedningDiv">
          <p className="pend_para">
            <span className="no_orange"> {users._id}</span>
          </p>
          <p className="pend_para">
            <span className="no_orange"> {users.name}</span>
          </p>
          <p className="pend_para">
            <span className="no_orange"> {users.email}</span>
          </p>
          
        <p className="pend_para">
            <span className="no_orange">{users.createdAt}</span>
          </p>
        
          <p className="pend_para">
            <span className="no_orange"> {users.role}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default AllUsers;
