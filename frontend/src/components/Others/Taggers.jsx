import React from 'react'
import "./Taggers.css"
const Taggers = (props) => {

  return (
    <p className='tags' id='tags' >{props.tags}</p>
  )
}

export default Taggers