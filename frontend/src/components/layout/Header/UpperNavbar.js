import React, { useState,useContext, useLayoutEffect, Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { barContext } from "../../../App";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


const UpperNavbar = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const topload = useContext(barContext)
  
  const [open, setOpen] = useState(true);
  const [options, setoptions] = useState([])

  const { loading,user } = useSelector((state) => state.user);
  const { modes } = useSelector((state) => state.DarkMode);
  const { cartItems } = useSelector((state) => state.cart);
  
  
  // console.log(user?.role);
  function dashboard() {
    topload()
    navigate("/admin/dashboard/myDetails");
  }
  function cart() {
    topload()
    navigate("/cart");
  }

  function order() {
    topload()
    navigate("/orders");
  }

  function account() {
    topload()
    navigate("/me");
  }

  function logoutUser() {
    topload()
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  useLayoutEffect(()=>{
    
    let opt = [
      // { icon: <PersonIcon />, name: "Profile", func: account },
      { icon: <ShoppingCartIcon />, name: `cart(${cartItems.length})`, func: cart },
      { icon: <ListAltIcon />, name: "Orders", func: order },
    { icon: <ExitToAppIcon />, name: "Log Out", func: logoutUser },
  ];
  if (user?.role === "admin" || user?.role === "admin_one") {
    opt.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  setoptions(opt)
 return ()=>setoptions([])
},[user])



  return (
    <>
    <Fragment>
      {!loading ?

<nav
      className={`navbar navbar-${modes ? `dark` : `light`} bg-${
        modes ? `dark` : `light`
      } ${modes ? "blackImp" : "whiteImp"}`}
    >
      <div className="container upnavcon">
        <Link to={'/'} className="navbar-brand fs-1 gwen zindexer" onClick={()=> topload()}>Gadget Zone</Link>

        {user ? (
          <>
            {/* <span >Gadget Zone</span> */}

            <SpeedDial 
              ariaLabel="SpeedDial tooltip example"
              onClose={() => setOpen(true)}
              onOpen={() => setOpen(true)}
              open={open}
              direction="left"
              className="speedDial"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={
                <img
                onClick={()=>account()}
                className="speedDialIcon"
                  src={user?.avatar?.url || "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"}
                  alt=""
                />
              }
            >
              {options.map((item) => (
                <SpeedDialAction
                  key={item.name}
                  icon={item.icon}
                  tooltipTitle={item.name}
                  onClick={item.func}
                />
              ))}
            </SpeedDial>
          </>
        ) : (
          <div className="buttonbox">
            <Link className="upnavbtns" to="/LogSign" onClick={()=> topload()}>
              Login / Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
          :""}
          </Fragment>
    </>

  );
};

export default React.memo(UpperNavbar);
