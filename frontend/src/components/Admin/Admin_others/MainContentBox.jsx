import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productDetailsReducer } from "../../../reducers/productReducer";
import "./MainControllerBox.css";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { getAllOrders } from "../../../actions/orderActions";
import PendingOrder from "./pendingOrder";
import AllOrder from "./AllOrder";
const MainContentBox = () => {

  const dispatch = useDispatch();

  let { modes } = useSelector((state) => state.DarkMode);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { totalOrders,orders } = useSelector((state) => state.orders);

  const [exDate, setexDate] = useState("");
  const [userProds, setuserProds] = useState(0);
  const [lastCreated, setlastCreated] = useState(0);
  const [selllastord, setselllastord] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch,getAllOrders])
  

  var root = document.querySelector(":root");
  useEffect(() => {
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
    let setting_ex_Date = filterdate(user?.createdAt);
    setexDate(setting_ex_Date);
  }, [user]);

  useEffect(() => {
    check_products_user();
  }, [products]);


  useEffect(() => {
    check_order_user();
    check_pending_orders();
  }, [orders]);


  // function to extract the orders that are not completed yet
  function check_pending_orders(){
    if(orders){
      let checkingPend = orders?.filter((s)=>s.orderStatus !=="delivered")
      setPendingOrders(checkingPend)
    }
  }

  function filterdate(getDated) {
    let usercr = getDated.split("-");
    let exdate = `${usercr[2].slice(0, 2)} - ${usercr[1]} - ${usercr[0]}`;
    return exdate;
  }

  function check_order_user(){
    if (orders) {
      let wasord = orders[orders?.length-1];
      let lasord = wasord?.createdAt
      if(lasord){
        let checkord = filterdate(lasord);
        setselllastord(checkord)
      }
      // console.log(checkord)
    }
  }
  function check_products_user() {
    let check_prods_user = products
      ?.map((p) => p.user === user?._id)
      .filter((s) => s === true).length;
    setuserProds(check_prods_user);
    let ex_prods_user = products?.filter((p) => p.user === user?._id);
    let Last_prods_user = ex_prods_user.map((s) => s.createdAt);
    let Last_prods_user_number = Last_prods_user[ex_prods_user.length - 1];
    if (Last_prods_user_number) {
      let getlastprods = filterdate(Last_prods_user_number);
      setlastCreated(getlastprods);
    }

    // console.log(Last_prods_user_number)
  }
  //   console.log(user)
  return (
    <>
      <div className="contentBox">
        <div className="conBox0 ">
          <div className="inConBox0_1 bx">
            <h3 className="mainNameHead">
              👋🏻 Hi, <span className="coloror"> {user?.name}</span>!!
            </h3>
          </div>
        </div>
        <div className="smallBoxes">
          <div className="smallBoxes_1 smbxs bx">
            <div className="insmallbox1_1 evheadBox">
              <h4>Details</h4>
              <Link to="#" className="Linkings">
                See All
              </Link>
            </div>
            <div className="insmallbox1_2">
              <p>
                Name : <span className="colorch"> {user?.name}</span>
              </p>
              <p>
                Email : <span className="colorch">{user?.email}</span>
              </p>
              <p>
                id : <span className="colorch">{user?._id}</span>
              </p>
              <p>
                user Since : <span className="colorch">{exDate}</span>
              </p>
            </div>
          </div>
          <div className="smallBoxes_2 smbxs bx">
            <div className="insmallbox2_1 evheadBox">
              <h4>My Products</h4>
              <Link to="#" className="Linkings">
                See All
              </Link>
            </div>
            <div className="insmallbox2_2">
              <p className="coloror">
                Total Products :{" "}
                <span className="colorch"> {products?.length}</span>
              </p>
              <p className="coloror">
                Your Products : <span className="colorch">{userProds}</span>
              </p>
              <p className="coloror">
                Net Products Percentage :{" "}
                <span className="colorch">
                  {Math.floor((userProds * 100) / products?.length)}%
                </span>
              </p>
              <p className="coloror">
                Last Product Date :{" "}
                <span className="colorch">{lastCreated}</span>
              </p>
            </div>
          </div>
          <div className="smallBoxes_3 smbxs bx">
            <div className="insmallbox3_1 evheadBox">
              <h4>Orders</h4>
              <Link to="#" className="Linkings">
                See All
              </Link>
            </div>
            <div className="insmallbox3_2">
              <p className="coloror">
                Total Orders : <span className="colorch">{totalOrders}</span> 
              </p>
              <p className="coloror">
                Your Orders : <span className="colorch">{orders?.length}</span>
              </p>
              <p className="coloror">
                Net Orders Percentage : <span className="colorch">{Math.floor((orders?.length * 100) / totalOrders)}%</span>
              </p>
              <p className="coloror">
                Last Order Date : <span className="colorch">{selllastord}</span>
              </p>
            </div>
          </div>
          <div className="smallBoxes_4 smbxs bx">
            <div className="insmallbox3_1 evheadBox">
              <h4>My Strikes</h4>
              <Link to="#" className="Linkings">
                See All
              </Link>
            </div>
            <div className="insmallbox4_2">
              <p className="coloror">
                {user?.strikes?.length} / <span>5</span>
              </p>
            </div>
          </div>
        </div>

        <div className="conBox1">
          <div className="inConBox1_1 bx">
            <div className="inConBox1_1_1 evheadBox">
              <h4>Orders</h4>
            </div>
            <div className="inConBox1_1_2">
              <Line
                className="Line"
                data={{
                  labels: ["1th", "3th", "6th", "9th", "12th", "15th","18th", "21st", "24th", "27th", "30th"],
                  datasets: [
                    {
                      label: "Last Month",
                      data: [23, 25, 34, 34, 34, 46, 25, 35, 31, 34, 46],
                      fill: false,
                      backgroundColor: "rgba(214, 28, 78, 0.16)",
                      borderColor: "#D61C4E",
                      pointRadius:6,
                      pointHoverRadius: 1,
                    },
                    {
                      label: "This Month",
                      data: [33, 53, 65, 51, 64, 75, 53, 65, 41, 44, 75],
                      fill: true,
                      backgroundColor: "rgba(255, 140, 50, 0.1)",
                      borderColor: "#FF8C32",
                      pointRadius: 6,
                      pointHoverRadius: 1,
                      color: "red",
                      tension: 0.1,
                    },

                  ],
                }}
                options={{

                  responsive: true,
                  elements:{
                    hoverRadius:5,
                    hoverBorderWidth:10
                  },
                  scales: {
                    y: {
                      ticks: { color: "#ff8c32", beginAtZero: true,font:{
                        size:16,
                        family:"poppins"
                      } },
                    },
                    x: {
                      ticks: { color: "#ff8c32", beginAtZero: true,font:{
                        size:16,
                        family:"poppins"
                      } },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        // This more specific font property overrides the global property
                        font: {
                          size: 14,
                        },
                        // color:"blue"
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="inConBox1_2 bx">
            <div className="inConBox1_2_1 evheadBox">
              <h4>Pending Orders</h4>
            </div>
            <div className="inConBox1_2_1 evheadBox evheadBoxsmall">
              <p className="coloror">Order Details</p>
              <p className="coloror">Order Status</p>
            </div>
            <div className="inConBox1_2_2">
              {
                pendingOrders &&
                pendingOrders.map((s)=>(
                  <PendingOrder orders = {s} key={orders?._id}/>
                )).reverse()
              }
            </div>
          </div>
        </div>
        <div className="longBox1">
          <div className="longBox1_1 bx">
            <div className="inLongBox1_1_1 evheadBox">
              <h4>All Orders</h4>
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
              {
                orders &&
                orders.map((s)=> (<AllOrder orders={s} key={orders?.id}/>))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContentBox;
