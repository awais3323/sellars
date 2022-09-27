import React from 'react'
import "./AdminEditProduct.css"
import SideBar from '../Admin_others/SideBar'
import AdminUpdateProduct from './AdminUpdateProduct'



const AdminEditProduct = () => {
  return (
    <>
    <div className="mainBoxes">
      <SideBar/>
      <AdminUpdateProduct/>
    </div>
    </>
  )
}

export default AdminEditProduct
