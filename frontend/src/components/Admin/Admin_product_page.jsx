import React from 'react'
import MetaData from '../layout/MetaData'
import MainContentBox2 from "./AdminMainBoxes/MainContentBox2"
import SideBar from './Admin_others/SideBar'

const Admin_product_page = () => {
  return (
    <>
    <MetaData title="Dashboard Products" />
    <div className='mainBoxes'>
     <SideBar/> 
     <MainContentBox2/>
    </div>
    </>
  )
}

export default Admin_product_page
