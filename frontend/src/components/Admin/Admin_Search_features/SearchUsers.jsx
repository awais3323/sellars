import React from 'react'
import MetaData from '../../layout/MetaData'
import SideBar from '../Admin_others/SideBar'
import SearchBox2 from '../Admin_Search_boxes/SearchBox2'
import "./SearchUsers.css"

const SearchUsers = () => {
  return (
    <>
    <MetaData title="Search Users" />

    <div className='MainSearchComp2'>
     <SideBar/>
     <SearchBox2/>
    </div>
    </>
  )
}

export default SearchUsers
