import React from 'react'
import "./color.css"
const Colors = React.memo((props) => {
    // console.log(props.s)
    const {s} =props
  return (
    <>
    <div className='colDiv' style={{background:`${s}`, color:`${s}`}}>
    ""
    </div>
    </>
  )
})
export default Colors
