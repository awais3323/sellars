import React, { useState , useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
// import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import AAsOfLowNav from "./AAsOfLowNav";

const LowerCatNav = () => {
  const { modes } = useSelector((state) => state.DarkMode);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [nav, setnav] = useState(false)

  let dark = {
    bg: "black",
    color: "black",
    lbg: "grey",
  };
  let light = {
    bg: "white",
    // bg: "#f8f9fb",
    color: "white",
    lbg: "grey",
  };

  // useEffect(() => {
  //   window.onscroll = () => {
  //     setnav(window.pageYOffset <= 5 ? false : true);
  //     return () => (window.onscroll = null);
  //   };
  // }, []);
  // window.addEventListener("scroll", NavbarFixing);
const render = useRef(0)
  return (
    <>
      <div
        id="container3"
        className={`${`${isAuthenticated ? `container3 posFix` : `container4 posFix2`}`}`}
        style={{ backgroundColor: `${modes ? dark.bg : light.bg}` }}
        >
          {/* <h1>{render.current++}</h1> */}
            <AAsOfLowNav
            />
      </div>
    </>
  );
};

export default React.memo(LowerCatNav);
