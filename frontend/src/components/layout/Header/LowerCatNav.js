import React, { useState } from "react";
// import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import AAsOfLowNav from "./AAsOfLowNav";

const LowerCatNav = () => {
  const { products } = useSelector((state) => state.products);
  const { modes } = useSelector((state) => state.DarkMode);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { prodi } = useSelector((state) => state.prods);

  let arr = products.map((s) => s.category).reverse();
  console.log(arr)

  let f_arr = [...new Set(arr)];

  f_arr.unshift("All_Products")
  let arrayUniqueByKey = f_arr

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
  const [nav, setnav] = useState({
    scroll: false,
  });
  const NavbarFixing = () => {
    if (window.scrollY >= 4) {
      setnav({
        scroll: true,
      });
    } else {
      setnav({
        scroll: false,
      });
    }
  };
  window.addEventListener("scroll", NavbarFixing);

  return (
    <>
      <div
        id="container3"
        className={`${
          nav.scroll
            ? `container3 ${isAuthenticated ? `posFix` : `posFix2`}`
            : `container3`
        }`}
        style={{ backgroundColor: `${modes ? dark.bg : light.bg}` }}
      >
        {arrayUniqueByKey &&
          arrayUniqueByKey.map((arrayUniqueByKeys) => (
            <AAsOfLowNav
              key={Math.random() * 1000}
              product={arrayUniqueByKeys}
            />
          ))}
      </div>
    </>
  );
};

export default LowerCatNav;
