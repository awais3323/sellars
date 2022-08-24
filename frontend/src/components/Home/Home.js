import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import Slider from "./Slider";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import TextReveal from "./TextReveal";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAlert } from "react-alert";

const Home = (props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  const { modes } = useSelector((state) => state.DarkMode);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const keys = "name";
  let filProd = [
    ...new Map(products.map((item) => [item[keys], item])).values(),
  ];
  window.addEventListener("load", props.changingState);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Gadget Zone" />
          <div
            className={`${
              modes ? `Front-setups my-5 black_bg` : `Front-setups my-5`
            }`}
          >
            <div className="First_half">
              <TextReveal />
              <Slider />
            </div>
          </div>
          <h1 className="homeHeading greet" data-aos="fade-up">
            Featured Products
          </h1>
          <div className="container2 my-5" id="container2">
            {filProd &&
              filProd
                .map((product) => (
                  <Product
                    key={Math.random() * 1000}
                    product={product}
                    changingState={props.changingState}
                  />
                ))
                .reverse()}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
