import React from "react";
import { useSelector } from "react-redux";
import "./loader.css";


const Loader = () => {
  const { modes } = useSelector((state) => state.DarkMode);
  var root = document.querySelector(":root");
  if (modes) {
    root.style.setProperty("--customColor", "black");
  } else {
    root.style.setProperty("--customColor", "white");
  }
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
