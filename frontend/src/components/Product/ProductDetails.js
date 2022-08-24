import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import { productCategory } from "../../actions/otherActions";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Taggers from "../Others/Taggers";
import Product from "../Home/Product";

const ProductDetails = (props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  
  const { products} = useSelector((state) => state.products);

  let prodi = products.filter((s)=> s._id === id)
  // console.log(products)
  let product;
  if(prodi){
    product = prodi[0]
  }
  const options = {
    edit: false,
    color: "grey",
    activeColor: "#FF8C32",
    size: window.innerWidth < 600 ? 17 : 25,
    value: product?.ratings,
    isHalf: true,
  };
  window.addEventListener("load", props.changingState);

  const { modes } = useSelector((state) => state.DarkMode);

  var root = document.querySelector(":root");
  if (modes) {
    root.style.setProperty("--customColor", "white");
  } else {
    root.style.setProperty("--customColor", "#212429");
  }

  const [quantity, setquantity] = useState(1);
  function decreaser() {
    if (quantity === 1 || quantity < 1) {
      setquantity(1);
    } else {
      setquantity(quantity - 1);
    }
  }
  function increaser(st) {
    if (product?.Stock > quantity) {
      setquantity(quantity + 1);
    } else {
      alert.error(`Sorry! we only have ${st} product in stock `);
    }
  }
  function handleChange(e) {
    setquantity(e.target.value);
  }
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success(`${product?.name} has been added to cart`);
  };
  const [rating, setRating] = useState(0);

  let filReviews = product?.reviews?.filter((s) => s?.rating >= rating);
  function copies() {
    let copy = document.getElementById("prodId").innerHTML;
    navigator.clipboard.writeText(copy);
    alert.success("Copied to clipboard");
  }

  let onlytags = product?.Tags?.map((s) => s);
  var arr;
  onlytags?.forEach((element) => {
    arr = Object.values(element);
  });
  if (arr) {
    arr.pop();
    // console.log(arr)
  }
  let filli = products.filter(
    (s) => s.category === product?.category && s._id !== product?._id
  );
  // console.log(filli)
  var killi = [];
  products.forEach((ele) => {
    let elements = ele.Tags.map((s) => s);
    let tempArr;
    elements.forEach((els) => {
      tempArr = Object.values(els);
      tempArr.pop();
    });
    // console.log(tempArr)
    if (arr) {
      arr.forEach((ely) => {
        if (tempArr !== undefined) {
          if (tempArr.includes(ely)) {
            killi.push(ele);
          }
        }
        // console.log(tempArr)
      });
    }
  });
  let gandalf = [...new Set(killi)];
  let thorin = [...filli, ...gandalf];
  let dragon = [...new Set(thorin)];
  let _hobbit = dragon.filter((s) => s._id !== product?._id);

  return (
   
        <Fragment>
          <MetaData title={`${product?.name}`} />
          <div
            className="ProductDetails"
            style={{ backgroundColor: `${modes ? "black" : "white"}` }}
          >
            <div className="longdiv">
              <Carousel>
                {product?.images &&
                  product?.images.map((item, i) => (
                    <img
                      // data-aos="fade-up"
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="secondbox">
              <div className="detailsBlock-1">
                <h2 data-aos="fade-up" className="mainHeading">
                  {product?.name}
                </h2>
                <div className="copier">
                  <p className="idpara">
                    Product Id: <span id="prodId">#{product?._id}</span>
                  </p>
                  <p className="logoCopy" onClick={() => copies()}>
                    Copy
                  </p>
                </div>
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-2-span" data-aos="fade-up">
                  <ReactStars {...options} /> ({product?.numOfReviews} Reviews)
                </span>
                {product?.sales ? (
                  <span className="detailsBlock-2-span-2" data-aos="fade-up">
                    {`${product?.sales}% Sale`}
                  </span>
                ) : (
                  ""
                )}
                {product?.limited !== "none" && product?.limited ? (
                  <span className="detailsBlock-2-span-2" data-aos="fade-up">
                    Limited
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="detailsBlock-3">
                <div className="priceFlex">
                  <h1 data-aos="fade-up">{`Rs. ${
                    product?.sales
                      ? product?.price - product?.price * (product?.sales / 100)
                      : product?.price
                  }`}</h1>
                  <small data-aos="fade-up" className="mx-2">
                    <strike>{product?.sales ? product?.price : ""}</strike>
                  </small>
                </div>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button data-aos="fade-up" onClick={() => decreaser()}>
                      -
                    </button>
                    <input
                      type="number"
                      readOnly
                      className={`mx-3 numberinp ${
                        modes ? `whiteC` : `blackC`
                      }`}
                      onChange={(e) => handleChange()}
                      value={quantity}
                    />
                    <button
                      // data-aos="fade-up"
                      onClick={() => increaser(product?.Stock)}
                    >
                      +
                    </button>
                  </div>
                  {/* <button data-aos="fade-up">Add to Cart</button> */}
                </div>

                <p>
                  Status:
                  <b
                    // data-aos="fade-up"
                    className={product?.Stock < 1 ? "redColor" : "greenColor"}
                  >
                    {product?.Stock < 1 ? " OutOfStock" : " InStock"}
                  </b>
                </p>
                <span className="headingTags">Tags :</span>
                <div className="hell">
                  {arr && arr.map((tags) => <Taggers key={tags} tags={tags} />)}
                </div>
              </div>
              <div className="detailsBlock-4">
                <span data-aos="fade-up">Description : </span>
                <p className="my-2">{product?.description}</p>
              </div>
              <div className="twobuts">
                <button data-aos="fade-up" className="submitReview">
                  Submit Review
                </button>
                {/* <Popup/> */}
                <button
                  data-aos="fade-up"
                  className="submitReview extraAdd"
                  onClick={() => addToCartHandler()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <h3 className="homeHeading greet" data-aos="fade-up">
            REVIEWS
          </h3>
          {product?.reviews?.length > 0 ? (
            <div className="reviewContainer">
              <fieldset>
                <Typography component="legend" className="legend">
                  Review Ratings
                </Typography>
                <Slider
                  value={rating}
                  onChange={(e, newRating) => {
                    setRating(newRating);
                  }}
                  aria-labelledby="continous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  marks={true}
                  aria-label="custom thumb label"
                  max={5}
                  className="slider"
                />
              </fieldset>
            </div>
          ) : (
            ""
          )}
          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {filReviews &&
                filReviews.map((review) => (
                  <ReviewCard key={review.name} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews orange"> Sorry!!! no Reviews yet</p>
          )}
          <div className="maylikeproducts">
            <h6 className="homeHeading greet">More Interesting Products</h6>
              <div className="moreProducts">
                {_hobbit &&
                  _hobbit.map((prods) => (
                    <Product key={Math.random() * 1000} product={prods} />
                  ))}
              </div>
          </div>
        </Fragment>
  );
};

export default ProductDetails;
