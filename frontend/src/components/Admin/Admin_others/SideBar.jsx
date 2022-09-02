import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../../actions/otherActions";
import { barContext } from "../../../App";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FaGem,
  FaMoon,
  FaSun,
  FaArrowRight,
  FaArrowLeft,
  FaUserCheck,
} from "react-icons/fa";
import "./sideBar.css";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsBasketFill } from "react-icons/bs";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";


const SideBar = React.memo(() => {

  const dispatch = useDispatch();
  const topload = useContext(barContext);

  const [open, setOpen] = useState(true);

  let { modes } = useSelector((state) => state.DarkMode);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const setMode = () => {
    let modeSet;
    if (modes) {
      modeSet = false;
      localStorage.setItem("moding", false);
    } else {
      modeSet = true;
      localStorage.setItem("moding", true);
    }
    topload();
    dispatch(setDarkMode(modeSet));
  };
  // useEffect(()=>{

  var root = document.querySelector(":root");
  if (modes) {
    root.style.setProperty("--customColor", "black");
    root.style.setProperty("--customColor_two", "white");
  } else {
    root.style.setProperty("--customColor", "RGB(245, 249, 252)");
    root.style.setProperty("--customColor_two", "#212429");
  }
  // },[modes])

  useEffect(() => {
    dispatch(setDarkMode());
  }, [dispatch]);
  return (
    <>
      <ProSidebar collapsed={open} collapsedWidth={70}>
        <SidebarHeader>
          <Menu iconShape="circle">
            <MenuItem
            id="firsst one"
              onClick={() => setOpen(!open)}
              icon={open ? <FaArrowRight /> : <FaArrowLeft />}
            >
              close
            </MenuItem>
            <MenuItem icon={<FaUserCheck />}>{user?.name}</MenuItem>
          </Menu>
        </SidebarHeader>
        <Menu iconShape="circle">
          <SubMenu title="Products" icon={<BsBasketFill />}>
            <MenuItem><Link to={"/admin/dashboard/products"} onClick={()=>topload()} >Make and Edit Products</Link></MenuItem>
            <MenuItem>Search Products</MenuItem>
          </SubMenu>
          <SubMenu title="Orders" icon={<BsFillCartCheckFill />}>
            <MenuItem> <Link to={"/admin/dashboard/myDetails"} onClick={()=>topload()}>My Orders</Link> </MenuItem>
            <MenuItem>Search Orders</MenuItem>
          </SubMenu>
          <SubMenu title="Users" icon={<BsFillPersonCheckFill />}>
            <MenuItem> <Link to={"/admin/dashboard/Users"} onClick={()=>topload()}>All Users</Link></MenuItem>
            <MenuItem>Serach Users</MenuItem>
          </SubMenu>
        </Menu>
        <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem
              icon={modes ? <FaMoon /> : <FaSun />}
              onClick={() => setMode()}
            >
              {modes ? "Light " : "Dark "}Mode
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
});

export default SideBar;
