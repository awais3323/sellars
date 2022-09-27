import React from 'react'
import SideBar from '../Admin_others/SideBar'
import AdminUserBox from './AdminUserBox'
import "./AdminUserBoxContainer.css"

const AdminUserBoxContainer = () => {
  return (
    <>
     <div className="mainContentBox">
        <SideBar/>
        <AdminUserBox/>
        </div> 
    </>
  )
}

export default AdminUserBoxContainer
