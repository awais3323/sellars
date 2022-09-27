import React from 'react'
import MetaData from '../layout/MetaData'
import MainContentBox from './AdminMainBoxes/MainContentBox'
import SideBar from './Admin_others/SideBar'
import "./dashboard.css"

const Dashboard = () => {

  return (
    <>
    <MetaData title="Dashboard Orders" />
    <div className='mainBoxes'>
      
      {/* As Salam O Alaikum!!! kia haal hai ap ke  */}
      <SideBar/>
      <MainContentBox/>
    </div>
    </>
  )
}

export default React.memo(Dashboard);
