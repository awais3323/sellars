import React,{useContext, useEffect,useState,useCallback, useRef, Fragment} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { barContext } from "../../../App";


const AAsOfLowNav = () => {
  
  const { loading,products } = useSelector((state) => state.products);
  const { modes } = useSelector((state) => state.DarkMode);


  const topload = useContext(barContext)
  const navigate = useNavigate();

  const [arrayUniqueByKey, setarrayUniqueByKey] = useState([])
  
  
  const make_The_Unique = useCallback(() => {
  
    let arr = products.map((s) => s.category).reverse();
    let f_arr = [...new Set(arr)];
    f_arr.unshift("All_Products")
    setarrayUniqueByKey(f_arr); 
  }, [products.length > 0])
  
  // console.log(arrayUniqueByKey)
  useEffect(() => {
    make_The_Unique();
    }, [products])

  const searchSubmitHandler = (e,s) =>{
    e.preventDefault()
    topload()
    if(s!== "All_Products"){

      if (s.trim()) {
        navigate(`/producters/${s}`)
      }
      else{
        navigate(`/product`)
      }
    }
    else{
      navigate(`/product`) 
    }
  }

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

  // console.log("I am child component and i am re rendering")
  let render = useRef(0)
  return (
    <Fragment>
      {
        loading=== false?
    <>
    
    {/* <h1>{render.current++}</h1> */}
    {
      arrayUniqueByKey && arrayUniqueByKey.map((s)=>(   <span className="Linker" style={{backgroundColor:`${modes?dark.bg:light.bg}`,border:`${modes?"2px solid rgba(255, 255, 255, 0.593)":"2px solid rgba(128, 128, 128, 0.379)"}`,color:`${modes?"rgba(255, 255, 255, 0.793)":dark.color}`}} onClick={(e)=>searchSubmitHandler(e,s)}>
        {s}
      </span>
      ))
    }
   
    </>
        :""
      }
    </Fragment>
  );
};

export default React.memo(AAsOfLowNav);
