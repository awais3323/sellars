import React from "react";
import { useSelector } from "react-redux";
const TextReveal = (props) => {
  const { modes } = useSelector((state) => state.DarkMode);

  return (
    <>
    <div className="th__cont">
      <div className="reveal">
        <h1 className="reveal__content greet ">WELCOME </h1>
      </div>
      <div className="reveal">
        <h2 className={`${modes?`reveal__content white_c`:`reveal__content`}`}>
          Hey! <small className="greet">Whass up</small>
        </h2>
      </div>
      <div className="reveal">
        <p className={`${modes?`reveal__content white_c`:`reveal__content`}`}>
          Its really good to meet you i am sure you will find awesome gadgets of
          your choice and use .Here In this Online Gadget market you will explore
          <strong> "Quality Products"</strong> being sold by one of the most
          <strong> "trusted and talented Sellers"</strong> on internet.
        </p>
      </div>
      <div className="reveal">
        <h1 className="reveal__content greet ">Happy Shopping!</h1>
      </div>
    </div>
    </>
  );
};

export default React.memo(TextReveal);
