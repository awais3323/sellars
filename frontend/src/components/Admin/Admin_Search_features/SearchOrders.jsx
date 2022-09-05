import React from 'react'
import MetaData from '../../layout/MetaData'
import SideBar from '../Admin_others/SideBar'
import SearchBox3 from '../Admin_Search_boxes/SearchBox3'
import "./SearchUsers.css"

const SearchOrders = () => {
  return (
    <>
    <MetaData title="Search Orders" />

    <div className='MainSearchComp2'>
      <SideBar/>
      <SearchBox3/>
    </div>
    </>
  )
}

export default SearchOrders
