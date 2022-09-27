import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getallOrders} from "../../../actions/orderActions";
import OrderCard from "../../Orders/OrderCard";
import AllOrder from "../Admin_others/AllOrder";
import SearchBarAd from "../Admin_Search_features/SearchBarAd";
import "./bigSearchBox.css";

const SearchBox3 = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
  let { modes } = useSelector((state) => state.DarkMode);
  const { orders } = useSelector(
    (state) => state.ordersAll
  );
//   console.log(ordersSells)
  useEffect(() => {
    dispatch(getallOrders());
  }, [dispatch]);
  const [arrayList, setarrayList] = useState("");
  const [ex_orders, setex_orders] = useState("");
  const [ex_products, setex_products] = useState("");
  
  useEffect(() => {
    check_user_add_user();
  }, [user]);
  useEffect(() => {
    checkuserOrders();
  }, [orders]);

function checkuserOrders(){
    if (user?.role === "admin_one") {
        setex_orders(orders)
    } else {
        if(orders && orders.length >0){
            let filt = orders.filter((s)=> s.seller === user._id)
            setex_orders(filt)
        }

      }
}


  function check_user_add_user() {
    let List = ["All", "Order name", "id","status","total price"];
    if (user?.role === "admin_one") {
        List.push("seller");
        setarrayList(List);
    } else {
        setarrayList(List);
    }

  }
//   console.log(ex_orders)

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

  // function to get the products according to the value of the drop down

  //   console.log(ex_products)
  // let render = React.useRef(0)
  return (
    <>
      <div className="bigsearchBox">
        {/* <h1>{render.current++}</h1> */}
        <SearchBarAd
          list={arrayList}
          items={ex_orders}
          setex_products={setex_products}
          title={"Orders"}
        //   user={user}
        />
        <div className="inConBox1_1_1 evheadBox">
        {ex_products?.length > 0 ? 
        <h4>All Orders <span className="coloror">Pen : {ex_products?.filter(s=>s.orderStatus === "pending").length}</span> , <span className="coloror">Pack : {ex_products?.filter(s=>s.orderStatus === "packed").length}</span> , <span className="coloror">Trans: {ex_products?.filter(s=>s.orderStatus === "transfered").length}</span>  , <span className="coloror">Deliv: {ex_products?.filter(s=>s.orderStatus === "delivered").length}</span>, <span className="coloror">Cancel: {ex_products?.filter(s=>s.orderStatus === "cancelled").length}</span> </h4>:""}

            </div>
        <div className="produtsRenderer">
          {ex_products &&
            ex_products.length > 0 &&
            ex_products
              .map((product) => (
                <OrderCard key={Math.random() * 1000} order={product} />
              ))
              .reverse()}
        </div>
      </div>
    </>
  );
};

export default SearchBox3;
