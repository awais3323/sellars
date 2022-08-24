import React, { Fragment } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
  getProductCategories,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData";

import { animateVisualElement } from "framer-motion";


const Products = (props) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [CurrentPage, setCurrentPage] = useState(1);
  const [price, setprice] = useState([0, 200000]);
  const [rating, setRating] = useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setprice(newPrice);
  };
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);
  const { modes } = useSelector((state) => state.DarkMode);

  const {
    producter,
    // filteredProductCount,
  } = useSelector((state) => state.pageProoductCategory);

  const { keyword } = useParams();
  const key = keyword;

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(key, CurrentPage, price, rating));
    dispatch(getProductCategories(key, CurrentPage, price, rating));
  }, [dispatch, key, CurrentPage, price, rating]);

  let count = filteredProductCount;

  const filProd =Object.assign(products,producter)

  
  window.addEventListener("load", props.changingState);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="All Products"/>
          <h2 className="homeHeading">Products</h2>
          <div
            className="filterBox"
            style={{ background: `${modes ? "black" : "white"}` }}
          >
            <Typography style={{ color: `${modes ? "white" : "black"}` }}>
              Price
            </Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={200000}
              className="slider"

            />
            <fieldset>
              <Typography
                style={{ color: `${modes ? "white" : "black"}` }}
                component="legend"
              >
                Rating Above
              </Typography>
              <Slider
                value={rating}
              className="slider"

                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continous-slider"
                valueLabelDisplay="auto"
                min={0}
                marks={true}
                aria-label="custom thumb label"
                max={5}
              />
            </fieldset>
          </div>
          <div className="products container2 my-5" id="container2">
            {filProd &&
              filProd.map((product) => (
                <Product key={product._id} product={product} />
              )).reverse()}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={CurrentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="1st"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
