import React,{memo} from 'react'
import "./color.css"
const Colors = (props) => {
    // console.log(props.s)
    const {s} =props
  return (
    <>
    <div className='colDiv' style={{background:`${s}`, color:`${s}`}}>
    ""
    </div>
    </>
  )
}
export default memo(Colors)
