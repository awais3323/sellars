import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./MainControllerBox.css";

const MainContentBox = () => {
  let { modes } = useSelector((state) => state.DarkMode);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    var root = document.querySelector(":root");
    if (modes) {
      root.style.setProperty("--customColorcon", "#212429");
      root.style.setProperty("--customColorcon_two", "black");
      root.style.setProperty("--customColorcon_font", "white");
    } else {
      root.style.setProperty("--customColorcon", "RGB(245, 249, 252)");
      root.style.setProperty("--customColorcon_two", "white");
      root.style.setProperty("--customColorcon_font", "#212429");
    }
  }, [modes]);
  return (
    <>
      <div className="contentBox">
        <div className="conBox0 ">
          <div className="inConBox0_1 bx">
            <h3 className="mainNameHead">👋🏻 Hi, {user?.name}!!</h3>
          </div>
        </div>
        <div className="smallBoxes">
          <div className="smallBoxes_1 smbxs bx">
            <div className="insmallox1_1 evheadBox">
              <h4>Details</h4>
            </div>
          </div>
          <div className="smallBoxes_2 smbxs bx">
            <div className="insmallox2_1 evheadBox">
              <h4>My Products</h4>
            </div>
          </div>
          <div className="smallBoxes_3 smbxs bx">
            <div className="insmallox2_1 evheadBox">
              <h4>Orders</h4>
            </div>
          </div>
          <div className="smallBoxes_4 smbxs bx">
            <div className="insmallox2_1 evheadBox">
              <h4>My Strikes</h4>
            </div>
          </div>
        </div>

        <div className="conBox1">
          <div className="inConBox1_1 bx">
            <div className="inConBox1_1_1 evheadBox">
              <h4>Orders</h4>
            </div>
          </div>
          <div className="inConBox1_2 bx">
            <div className="inConBox1_2_1 evheadBox">
              <h4>Recent Users</h4>
            </div>
          </div>
        </div>
        <div className="longBox1">
          <div className="longBox1_1 bx">
            <div className="inLongBox1_1_1 evheadBox">
              <h4>All Users</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContentBox;
