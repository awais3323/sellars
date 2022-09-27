import React, { useState } from 'react'
import "./Search_li_item.css"


const Search_li_item = React.memo((props) => {

function settingValue(){
  // console.log(props.li)
    props.val(props.li)
    // props.val2(props.li)
    props.act()
}
  return (
      <li className='thisLi' onClick={()=> settingValue()}>{props.li}</li> 
  )
})

export default Search_li_item
