import React from "react";
import MainContentBox3 from "./AdminMainBoxes/MainContentBox3";
import SideBar from "./Admin_others/SideBar";
const Admin_user_page = () => {
  return (
    <div>
      <div className="mainBoxes">
        <SideBar />
        <MainContentBox3 />
      </div>
    </div>
  );
};

export default Admin_user_page;
