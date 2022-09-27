import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";
const Intro = React.memo((props) => {
  const {modes} = props
  return (
    <div className="myDiv">
        Made By
        <a
          className="atag"
          href={"https://www.linkedin.com/in/awais-zahid-515a39224/"}
          target="_blank"
        >
          Awais Zahid
        </a>
        with <span className="heart">❤</span>
    </div>
  );
});

export default Intro;
