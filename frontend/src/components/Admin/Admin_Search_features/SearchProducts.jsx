import React from 'react'
import SideBar from '../Admin_others/SideBar'
import SearchBox from '../Admin_Search_boxes/SearchBox'
import "./SearchProducts.css"


const SearchProducts = () => {
  return (
    <div className='MainSearchComp'>
      <SideBar/>
      <SearchBox />
    </div>
  )
}

export default SearchProducts
