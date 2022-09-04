import React,{ useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
// import { motion } from "framer-motion";
import { barContext } from "../../App";

const Product = React.memo((props) => {
  const topload = useContext(barContext)
  // console.log(topload);
  const { modes } = useSelector((state) => state.DarkMode);
  const {product} = props
  const options = {
    edit: false,
    color: "grey",
    activeColor: "#FF8C32",
    size: window.innerWidth < 600 ? 17 : 28,
    value: product.ratings,
    isHalf: true,
  };
  const navigate = useNavigate();
  const onLinkClick = (e) => {
    e.preventDefault();
    topload();
    navigate(`/products/${product._id}`);
  };

  return (
    <>
      <Link
        className="productCard1 link my-5"
        to={`/products/${product._id}`}
        // data-aos = "fade-up"
        style={{ textDecoration: "none" }}
        onClick={onLinkClick}
      >
        <div
          className="productCard"
        >
          <div className="ImgCont">
            <img
              src={product.images[0].url}
              alt={product.name}
              className="prodImg"
            />
   
          </div>
          <div className="prodContent">
            <div className="prodFirst">
              <h4
                className="prodName"
                style={{ color: `${modes ? "white" : "black"}` }}
              >
                {product.name}
              </h4>
            </div>
            <div className="specialDiv">
            {product.limited !== "none" && product.limited?
              <div className="spec" style={{ color: `${modes ? "white" : "black"}` }}>Limited</div>
              :""
            }
            {product.sales ?
              <div className="spec" style={{ color: `${modes ? "white" : "black"}` }}>{product.sales}% Sale</div>
              :""
            }
            </div>
            <div className="prodReviews py-3">
              <ReactStars {...options} />{" "}
              {/* <span className="revNum">
                <small style={{ color: `${modes ? "white" : "black"}` }}>
                  ({product.numOfReviews})
                </small>
              </span> */}
            </div>
            <div className="PRprice">
              <div className="prf">
                <div>
                  <h5
                    className="prodPrice px-2"
                    style={{ color: `${modes ? "white" : "black"}` }}
                  >
                    Rs.{" "}
                    {product.sales
                      ? product.price - product.price * (product.sales / 100)
                      : product.price}
                  </h5>
                  <small className="prodSale">
                    {" "}
                    <strike
                      className="mx-5"
                      style={{ color: `${modes ? "white" : "black"}` }}
                    >
                      {product.sales ? product.price : ""}
                    </strike>
                  </small>
                </div>
                {/* <RiShoppingCartLine className="prodCarts" /> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* <button onClick={changingState}>acha</button> */}
    </>
  );
});

export default Product;

// <Link className="productCard" to={product._id}>
//   <img src={product.images[0].url} alt={product.name} />
//   <p>{product.name}</p>
//   <div>
//     <ReactStars {...options} /> <span>({product.numOfReviews} rev)</span>
//   </div>
//   <span>Rs.  {product.price}</span>
// </Link>
