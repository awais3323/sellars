import React, { memo } from "react";
import "./color.css";
const Colors = (props) => {
  // console.log(props.s)
  const { s,index,setcolor } = props;
  function setsizer(){
    // console.log("I am pressing it")
    setcolor(s)
  }
  return (
    <>
      {/* <div className={`colDiv ${s}`} style={{background:`${s}`, color:`transparent`}}>
    " "
    </div> */}
      <div className="input-container">
        <label
          className="radio-tile-label"
          style={{ backgroundColor: `${s}`, borderRadius: `${100}px` }}
        >
          <input
            type="radio"
            value={s}
            className="radio-button uncheckall"
            name="print_color"
            defaultChecked={index === 0?true:false}
            onClick={()=>setsizer()}
          />
          <div
            className="radio-tile-edit"
            style={{ backgroundColor: `${s}` }}
          >
          </div>
        </label>
      </div>
    </>
  );
};
export default memo(Colors);
