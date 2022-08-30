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
  FaHeart,
  FaArrowRight,
  FaArrowLeft,
  FaUserCheck,
} from "react-icons/fa";
import "./sideBar.css";
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
              onClick={() => setOpen(!open)}
              icon={open ? <FaArrowRight /> : <FaArrowLeft />}
            >
              close
            </MenuItem>
            <MenuItem icon={<FaUserCheck />}>{user?.name}</MenuItem>
          </Menu>
        </SidebarHeader>
        <Menu iconShape="circle">
          <MenuItem icon={<FaGem />}>My Details</MenuItem>
          <SubMenu title="Products" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
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
