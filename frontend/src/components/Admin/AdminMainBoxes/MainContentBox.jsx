import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MainControllerBox.css";
import { getSellerOrders } from "../../../actions/orderActions";
import PendingOrder from "../Admin_others/pendingOrder";
import AllOrder from "../Admin_others/AllOrder";
import { VscRefresh } from "react-icons/vsc";
import SmallBoxes_ad from "../Admin_others/Admin_Mainthings/SmallBoxes_ad";
import Graphs from "../Admin_others/Admin_Mainthings/Graphs";



const MainContentBox = React.memo(() => {
  const dispatch = useDispatch();

  let { modes } = useSelector((state) => state.DarkMode);
  const {  user } = useSelector((state) => state.user);
  // const { products } = useSelector((state) => state.products);
  const { OrderDates, orders } = useSelector(
    (state) => state.orders
  );


  const [pendingOrders, setPendingOrders] = useState(null);
  const [data_one, setData_one] = useState(null);
  const [data_two, setData_two] = useState(null);
  const [data_three, setData_three] = useState(null);
  const [AllOrders, setAllOrders] = useState(null);

  useEffect(() => {
    dispatch(getSellerOrders());
  }, [dispatch, getSellerOrders]);

  useEffect(() => {
    var root = document.querySelector(":root");
    if (modes) {
      root.style.setProperty("--customColorcon", "#212429");
      root.style.setProperty("--customColorcon_two", "black");
      root.style.setProperty("--customColorcon_font", "white");
      root.style.setProperty("--customColorcon_boxshd", "rgba(166,155,155,0)");
    } else {
      root.style.setProperty("--customColorcon", "rgba(196, 215, 224, 0.31)");
      root.style.setProperty("--customColorcon_two", "white");
      root.style.setProperty("--customColorcon_font", "#212429");
      root.style.setProperty(
        "--customColorcon_boxshd",
        "rgba(166,155,155,0.55)"
      );
    }
  }, [modes]);

  useEffect(() => {
  }, [user]);



  useEffect(() => {
    check_pending_orders();
    make_All_Order_Date();
    set_All_Orders();
    // setAllOrders(orders);
  }, [orders]);

  useEffect(() => {
    make_All_Order_Date();
  }, [orders?.user]);

  // console.log(OrderDates)

  function set_All_Orders(){
    setAllOrders(orders);
  }

  function make_All_Order_Date() {
    let date_data1 = [];
    let date_data2 = [];
    let date_data3 = [];

    let this_month_dates = []
    let last_month_dates = []
    let laster_than_month_dates = []

    if (OrderDates && OrderDates.length > 0) {
      let lastord = OrderDates[OrderDates.length-1];
      let ls_this = lastord[lastord.length - 2];
      let ls_last = lastord[lastord.length - 2] - 1;
      let ls_laster = lastord[lastord.length - 2] - 2;

      OrderDates.forEach(element => {
        if(element[1] === ls_this){
          this_month_dates.push(element)
        }
        else if(Number(element[1]) === ls_last){
          last_month_dates.push(element)
        }
        else if(Number(element[1]) === ls_laster){
          laster_than_month_dates.push(element)
        }
      });
      let max = 31;
      // console.log(max)
      for (let j = 1; j <= max; j++) {
      let counter = 0;
      let counter2 = 0;
      let counter3 = 0;
      
      this_month_dates.forEach((ele,i) => {
        if(Number(ele[0]) === j){
          counter ++
        }
      });
      date_data1.push(counter)
      last_month_dates.forEach((ele,i) => {
        if(Number(ele[0]) === j){
          counter2 ++
        }
      });
      date_data2.push(counter2)
      laster_than_month_dates.forEach((ele,i) => {
        if(Number(ele[0]) === j){
          counter3 ++
        }
      });
      date_data3.push(counter3)
    }      
    }
    // console.log(date_data2)
    setData_one(date_data1)
    setData_two(date_data2)
    setData_three(date_data3)
  }

  // function to extract the orders that are not completed yet
  function check_pending_orders() {
    if (orders) {
      let checkingPend = orders?.filter((s) => s.orderStatus !== "delivered");
      setPendingOrders(checkingPend);
    }
  }


  return (
    <>
      <div className="contentBox">
       <SmallBoxes_ad/>

        <div className="conBox1">
          <div className="inConBox1_1 bx">
            <div className="inConBox1_1_1 evheadBox">
              <h4>Orders</h4>
              <VscRefresh className="refericon" onClick={()=>dispatch(getSellerOrders())}/>

            </div>
            <div className="inConBox1_1_2">
              <Graphs data1={data_one} data2={data_two} data3={data_three}/>
            </div>
          </div>
          <div className="inConBox1_2 bx">
            <div className="inConBox1_2_1 evheadBox">
              <h4>Pending Orders</h4>
              <VscRefresh className="refericon" onClick={()=>check_pending_orders()}/>

            </div>
            <div className="inConBox1_2_1 evheadBox evheadBoxsmall">
              <p className="coloror">Order Details</p>
              <p className="coloror">Order Status</p>
            </div>
            <div className="inConBox1_2_2">
              {pendingOrders &&
                pendingOrders
                  .map((s) => <PendingOrder orders={s} key={orders?._id} />)
                  .reverse()}
            </div>
          </div>
        </div>
        <div className="longBox1">
          <div className="longBox1_1 bx">
            <div className="inLongBox1_1_1 evheadBox">
              <h4>All Orders</h4>
              <VscRefresh className="refericon" onClick={()=>dispatch(getSellerOrders())}/>

              </div>
            {/* <div className="inConBox1_2_1 evheadBox evheadBoxsmall2">
              <p className="coloror">Order name</p>
              <p className="coloror">Order Id</p>
              <p className="coloror">Order Date</p>
              <p className="coloror">Order Status</p>
              <p className="coloror">Item Price</p>
              <p className="coloror">Total Price</p>
            </div> */}

            <div className="inLongBox1_1_2">
              {AllOrders &&
                AllOrders.map((s) => (
                  <AllOrder orders={s} key={orders?._id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default MainContentBox;
