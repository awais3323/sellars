import React from 'react'
import MainContentBox from './AdminMainBoxes/MainContentBox'
import SideBar from './Admin_others/SideBar'
import "./dashboard.css"

const Dashboard = () => {
  

  return (
    <div className='mainBoxes'>
      {/* As Salam O Alaikum!!! kia haal hai ap ke  */}
      <SideBar/>
      <MainContentBox/>
    </div>
  )
}

export default Dashboard
