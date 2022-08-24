import React,{useContext} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { barContext } from "../../../App";


const AAsOfLowNav = ({ product }) => {
  const topload = useContext(barContext)
  const navigate = useNavigate();
  
  const searchSubmitHandler = (e) =>{
    e.preventDefault()
    topload()
    if(product!== "All_Products"){

      if (product.trim()) {
        navigate(`/producters/${product}`)
      }
      else{
        navigate(`/product`)
      }
    }
    else{
      navigate(`/product`) 
    }
  }
  const { modes } = useSelector((state) => state.DarkMode);

  let dark = {
    color: "black",
    bg: "#212429",
    lbg: "grey",
  };
  let light = {
    bg: "rgba(128, 128, 128, 0.1)",
    color: "#f8f9fb",
    lbg: "gray",
  };
  return (
      <span className="Linker" style={{backgroundColor:`${modes?dark.bg:light.bg}`,border:`${modes?"2px solid rgba(255, 255, 255, 0.593)":"2px solid rgba(128, 128, 128, 0.379)"}`,color:`${modes?"rgba(255, 255, 255, 0.793)":dark.color}`}} onClick={searchSubmitHandler}>
        {product}
      </span>
  );
};

export default AAsOfLowNav;
