import React, { useState, useEffect,useContext } from "react";
import "./OrderCard.css";
import withReactContent from "sweetalert2-react-content";
import { updateOrderStatus } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader"
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { barContext } from "../../App";



const OrderCard = (props) => {
  let dispatch = useDispatch()
  let { order } = props;
  const MySwal2 = withReactContent(Swal);
  const [per, setper] = useState(0);
  const topload = useContext(barContext)


const {loading,success,error} = useSelector(state=>state.updateOrder)
const {  user } = useSelector((state) => state.user);


  useEffect(() => {
    if (order.orderStatus === "pending") {
      setper(5);
    } else if (order.orderStatus === "packed") {
      setper(35);
    } else if (order.orderStatus === "transfered") {
      setper(85);
    } else if (order.orderStatus === "delivered") {
      setper(100);
    } else if (order.orderStatus === "cancelled") {
      setper("Null");
    }
  }, [order]);
  useEffect(()=>{
    if(success){
      Swal.fire("Order has been Cancelled", "for any inconvenience please complaint us so we make our system better your feedback and trust really counts", "success");
      window.location.reload();
    }
    if(error){
      Swal.fire(`"Error",${error}`, "warning");

    }
  },[success,error])
  
  const navigate = useNavigate();
  const onLinkClick = (e) => {
    e.preventDefault();
    topload();
    navigate(`/orders/${order._id}`);
  };

  return (
    <>
       {loading ? (
      <Loader />
    ) : (
      <>
   
      
      <Link className="orCardain" to={`/orders/${order._id}`} onClick={onLinkClick}>
        <div className="imageSide">
          <img
            src={order.orderItems[0].image}
            alt="pics"
            className="Imageorder"
          />
        </div>
        <div className="sideboxOrders">
          <p>
            <span className="coloror">Order Id: </span> {order._id}
          </p>
          {
            user.role !== "user"?
            <p>
            <span className="coloror">User Id: </span> {order.user}
          </p>
          :""
          }
          <p>
            <span className="coloror">Name: </span> {order.orderItems[0].name}
          </p>
          <p>
            <span className="coloror">Status: </span> {order.orderStatus}{" "}
            <span className="coloror">({per} %)</span>{" "}
          </p>
          {/* <p><span className='coloror'>Total Price: </span>{order.totalPrice}</p> */}
          {order.orderStatus == "pending" || order.orderStatus === "packed" ? (
            <button
              className="OrderCancel"
              onClick={() =>
                MySwal2.fire({
                  title: `Do you really want to cancel " ${order.orderItems[0].name} " ?`,
                  text: `ID: ${order?._id} 
              
            •If you are cancelling this order because of product quality then beaware that we are giving you money back guarantee that the product will be 100% like it is promised. We never compromise on two things Quality and   Customer's trust 💙 
            Regards: Seller`,
                  icon: "warning",
                  showCancelButton: false,
                  confirmButtonColor: "red",
                  confirmButtonText: "Are you 100% sure??? ",
                  customClass: "swal-height",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(updateOrderStatus(order._id,"cancelled"))
                  }
                })
              }
            >
              Cancel Order
            </button>
          ) : (
            ""
          )}
        </div>
      </Link>
    
      </>
   ) }
    </>
  );
};

export default React.memo(OrderCard);
