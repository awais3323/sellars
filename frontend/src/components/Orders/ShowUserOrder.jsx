import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ShowUserOrder.css"
import { getUserOrders } from "../../actions/orderActions";
import OrderCard from "./OrderCard";
import { Link } from "react-router-dom";

const ShowUserOrder = () => {
  const dispatch = useDispatch();

  const { totalOrders, orders } = useSelector((state) => state.orders);
  const [order, setorder] = useState("")
  useEffect(()=>{
    if(orders !== undefined){
      let fil = orders?.filter((s)=>s.orderStatus !== "cancelled")
      setorder(fil)
    }
  },[orders])
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch, getUserOrders]);

  return (
    <>
 
        <div className="mainUserOrderContainer">
        {
         order !== undefined && order.length >0?
           order.map((or)=>(
               <OrderCard order ={or} key={or._id}/>
               ))
       :
       <>
       <div className="noorders">
       <span className="coloror">No Orders let's do some shopping</span>
       <Link to="/product" className="viewAllBtn">View Products</Link>
       </div>
       </>
       }
      </div>
          
    </>
  );
};

export default React.memo(ShowUserOrder);
