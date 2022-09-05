import React from 'react'
import MetaData from '../../layout/MetaData'
import SideBar from '../Admin_others/SideBar'
import SearchBox from '../Admin_Search_boxes/SearchBox'
import "./SearchProducts.css"


const SearchProducts = () => {
  return (
<>
<MetaData title="Search Products" />

    <div className='MainSearchComp'>
      <SideBar/>
      <SearchBox />
    </div>
</>
  )
}

export default SearchProducts
