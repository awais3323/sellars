import React ,{useRef}from "react";
import MetaData from "../layout/MetaData";
import MainContentBox3 from "./AdminMainBoxes/MainContentBox3";
import SideBar from "./Admin_others/SideBar";
const Admin_user_page = () => {
  return (
    <>
    <MetaData title="Dashboard Users" />
      <div className="mainBoxes">
        <SideBar />
        <MainContentBox3 />
      </div>
    </>
  );
};

export default React.memo(Admin_user_page);
