import React from 'react'
import SideBar from '../Admin_others/SideBar'
import MainElementNewProduct from './MainElementNewProduct'
import "./makeProductAdmin.css"
const MakeProductsAdmin = () => {
  return (
    <>
    <div className="mainContentBox">

      <SideBar/>
      <MainElementNewProduct/>
    </div>
    </>
  )
}

export default MakeProductsAdmin;
