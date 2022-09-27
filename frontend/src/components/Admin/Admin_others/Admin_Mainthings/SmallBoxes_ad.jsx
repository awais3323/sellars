import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSellerOrders } from '../../../../actions/orderActions';



const SmallBoxes_ad =React.memo( () => {
    const dispatch = useDispatch();

  let { modes } = useSelector((state) => state.DarkMode);
  const {  user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const {  totalOrders, orders } = useSelector(
    (state) => state.orders
  );

  const [exDate, setexDate] = useState("");
  const [userProds, setuserProds] = useState(0);
  const [lastCreated, setlastCreated] = useState(0);
  const [selllastord, setselllastord] = useState(0);

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
    let setting_ex_Date = filterdate(user?.createdAt);
    setexDate(setting_ex_Date);
  }, [user]);

  useEffect(() => {
    check_products_user();
  }, [products]);

  useEffect(() => {
    check_order_user();
    // setAllOrders(orders);
  }, [orders]);

  // function to extract the orders that are not completed yet


  function filterdate(getDated) {
    let usercr = getDated.split("-");
    let exdate = `${usercr[2].slice(0, 2)} - ${usercr[1]} - ${usercr[0]}`;
    return exdate;
  }

  function check_order_user() {
    if (orders) {
      let wasord = orders[orders?.length - 1];
      let lasord = wasord?.createdAt;
      if (lasord) {
        let checkord = filterdate(lasord);
        setselllastord(checkord);
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
}
  return (
    <>
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
                Net Orders Percentage :{" "}
                <span className="colorch">
                  {Math.floor((orders?.length * 100) / totalOrders)}%
                </span>
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
    </>
  )
}
)
export default SmallBoxes_ad