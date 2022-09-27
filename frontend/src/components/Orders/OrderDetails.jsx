import React, { useState, useEffect } from "react";
import "./orderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getallOrders, updateOrderStatus } from "../../actions/orderActions";
import $ from "jquery";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../layout/Loader/Loader"


const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

  const { orders } = useSelector((state) => state.ordersAll);
const {loading,success,error} = useSelector(state=>state.updateOrder)


  const [singleOrder, setsingleOrder] = useState("");
  const [act, setact] = useState("");
  const [list, setList] = useState([]);

  $(".default_option").on("click", function () {
    setact("active");
    $(".dropdowner ul").addClass(act);
  });
  function Rem_class() {
    setact("");
    $(".dropdowner ul").removeClass("active");
  }


  useEffect(() => {
    dispatch(getallOrders());
  }, [dispatch, getallOrders]);
  useEffect(() => {
    if (orders !== undefined) {
      let fil = orders?.filter((s) => s._id === id);
      setsingleOrder(...fil);
    }
    setList(["pending", "packed", "transfered", "delivered", "cancelled"]);
  }, [orders]);

  const MySwal = withReactContent(Swal);
  useEffect(()=>{
    if(success){
      Swal.fire("Order has been Cancelled", "for any inconvenience please complaint us so we make our system better your feedback and trust really counts", "success");
      window.location.reload();
    }
    if(error){
      Swal.fire(`"Error",${error}`, "warning");

    }
  },[success,error])

  return(
      <>
    {
        loading ? <Loader/>:
        <>
  {
  singleOrder !== undefined &&
    singleOrder !== null &&
    singleOrder?.orderItems !== undefined ? 
    <>
      <div className="orderDetailContainer">
        <h3 className="ordId">
          {" "}
          <div>
          <span>Order Id :</span> {singleOrder._id}
          </div>
          <div className="dropdowner">
          <div className="default_option">{singleOrder.orderStatus}</div>
          <ul className="Thisul">
            {list &&
              list.map((s) => (
                <li onClick={()=>{
                    MySwal.fire({
                        title: ` ${s} Sure? `,
                        text: `ID: ${singleOrder._id} 
          • Before updating you must make the order ready according to state. You service will be counted as your tier in website Thanks!!`,
                        icon: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#FF8C32",
                        confirmButtonText: "Yes, I am sure 100% ",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(updateOrderStatus(singleOrder._id,s))
                        }
                      })
                    Rem_class()}}>{s}</li>
              ))}
          </ul>
        </div>
        </h3>
        
        <div className="firstContainerDetails">
          <div className="imagecontainerOrder">
            <img
              src={singleOrder?.orderItems[0]?.image}
              alt="product Image"
              className="OrderDetailImage"
            />
          </div>
          <div className="ordDetails full">
            <p>
              <span>Order Status :</span>
              {singleOrder.orderStatus}
            </p>
            <p>
              <span>Product Name :</span>
              {singleOrder?.orderItems[0]?.name}
            </p>
            <p>
              <span>Order Placed At :</span>
              {singleOrder.createdAt.replace("T", " / ").replace(".", " / ")}
            </p>
            <p>
              <span>Product Seller :</span>
              {singleOrder.seller}
            </p>
            <p>
              <span>Product Id :</span>
              {singleOrder?.orderItems[0]?.productId}
            </p>
            <p>
              <span>Product Quantity :</span>
              {singleOrder?.orderItems[0]?.quantity}
            </p>
            <p>
              <span>Product Color :</span>
              {singleOrder?.orderItems[0]?.color}
            </p>
            <p>
              <span>Product Size :</span>
              {singleOrder?.orderItems[0]?.size}
            </p>
            <small>
              <span>Product Comments </span>
              {singleOrder?.orderItems[0]?.comments}
            </small>
          </div>
        </div>
        <div className="secondcontainerDetails">
          <div className="shipmentInfo full">
            <p>
              <span>Address : </span>
              {singleOrder.shippingInfo.address}
            </p>
            <p>
              <span>City : </span>
              {singleOrder.shippingInfo.city}
            </p>
            <p>
              <span>State : </span>
              {singleOrder.shippingInfo.state}
            </p>
            <p>
              <span>Country : </span>
              {singleOrder.shippingInfo.country}
            </p>
            <p>
              <span>Pin Code : </span>
              {singleOrder.shippingInfo.pinCode}
            </p>
            <p>
              <span>Phone No : </span>
              {singleOrder.shippingInfo.phoneNo}
            </p>
            <p>
              <span>Phone no 2 : </span>
              {singleOrder.shippingInfo.phoneNo2}
            </p>
          </div>
          <div className="paymentInfo full">
            <p>
              <span>Payment Status : </span>
              {singleOrder.paymentInfo.status}
            </p>
            <p>
              <span>Payment Medium : </span>
              {singleOrder.paymentInfo.medium}
            </p>
            <p>
              <span>Payment Date : </span>
              {singleOrder.paidAt.replace("T", " / ").replace(".", " / ")}
            </p>
            <p>
              <span>Per Product Price : </span>
              {singleOrder.itemsPrice}
            </p>
            <p>
              <span>Service Charges : </span>
              {singleOrder.taxPrice}
            </p>
            <p>
              <span>Shipping Price: </span>
              {singleOrder.shippingPrice}
            </p>
            <p>
              <span>Total Price : </span>
              {singleOrder.totalPrice}
            </p>
          </div>
        </div>
      
      </div>
    </>
   : 
    ""
  }
)
  </>
}
</> 
)};

export default OrderDetails;
