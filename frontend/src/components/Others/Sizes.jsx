import React from 'react'
import "./sizes.css"
const Sizes = React.memo((props) => {
    const {sizes,index,setsize} = props
    function hellos(){
    setsize(sizes)
    }
  return (
    <>
      {/* <span className='Sizes'>{sizes}</span> */}
      <div className="input-container">
        <label
          className="radio-tile-label"
          style={{ backgroundColor: `transparent`, borderRadius: `${5}px` }}
          >
          <input
            type="radio"
            value={sizes}
            className="radio-button uncheckall hidden"
            name="print_aize"
            defaultChecked={index === 0?true:false}

            />
          <div
            className="radio-tile-edit2"
            style={{ backgroundColor: `transparent` }}
            onClick={()=>hellos()}
            >
            {sizes}
            </div>
        </label>
      </div>
    </>
  )
})

export default Sizes
