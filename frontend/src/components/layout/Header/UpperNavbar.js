import React, { useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { barContext } from "../../../App";
import { topLoadingBarReducer } from "../../../reducers/otherReducer";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const UpperNavbar = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const topload = useContext(barContext)

  const [open, setOpen] = useState(true);
  const { modes } = useSelector((state) => state.DarkMode);
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon />, name: `cart(${cartItems.length})`, func: cart },
    { icon: <ListAltIcon />, name: "Orders", func: order },
    { icon: <ExitToAppIcon />, name: "Log Out", func: logoutUser },
  ];
  if (user?.role === "admin" || user?.role === "admin_one") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  // console.log(user?.role);
  function dashboard() {
    topload()
    navigate("/admin/dashboard");
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
  return (
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
  );
};

export default UpperNavbar;
