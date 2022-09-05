import React from 'react'
import "./sizes.css"
const Sizes = React.memo((props) => {
    const {sizes} = props
  return (
    <>
      <span className='Sizes'>{sizes}</span>
    </>
  )
})

export default Sizes
