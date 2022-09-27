import React, { Fragment, useState, useEffect, useRef } from "react";
import "./../Product/productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import Colors from "../Others/Colors";
import Sizes from "../Others/Sizes";
import Loader from "../layout/Loader/Loader";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import $ from "jquery";
// import { useCallback } from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import easyPaisa from "../../images/easypng.png"
import jazzCash from "../../images/jazzpng.png"
import Swal from "sweetalert2";


const OrderOptions = React.memo((props) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { changingState } = props;

  const { loading, products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { modes } = useSelector((state) => state.DarkMode);

  // console.log(products)

  const [quantity, setquantity] = useState(1);
  const [colorSP, setcolorSP] = useState(null);
  const [sizesSP, setsizesSP] = useState(null);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const options = {
    edit: false,
    color: "grey",
    activeColor: "#FF8C32",
    size: window.innerWidth < 600 ? 17 : 25,
    value: product?.ratings,
    isHalf: true,
  };

  window.addEventListener("load", changingState);

  useEffect(() => {
    if (products) {
      let prodi = products.filter((s) => s._id === id);
      if (prodi) {
        setProduct(prodi[0]);
      }
    }
  }, [!loading, products.length > 0, id]);

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

  useEffect(() => {
    if (product?.colors !== "undefined") {
      var colSP = product?.colors?.split(",");
      if (Array.isArray(colSP)) {
        setColor(colSP[0]);
      }
    }
    if (product?.sizes !== "undefined") {
      var sizSP = product?.sizes?.split(",");
      if (Array.isArray(sizSP)) {
        setSize(sizSP[0]);
      }
      // setSize(sizSP[0])
    }
    setcolorSP(colSP);
    setsizesSP(sizSP);
  }, [product?.colors]);

  useEffect(() => {
    var root = document.querySelector(":root");
    if (modes) {
      root.style.setProperty("--customColorcon", "#212429");
      root.style.setProperty("--customColorcon_two", "black");
      root.style.setProperty("--customColorcon_font", "white");
      root.style.setProperty("--customColorcon_boxshd", "rgba(166,155,155,0)");
    } else {
      root.style.setProperty("--customColorcon", "rgba(196, 215, 224, 0.31)");
      root.style.setProperty("--customColorcon_two", "white");
      root.style.setProperty("--customColorcon_font", "#212429");
      root.style.setProperty(
        "--customColorcon_boxshd",
        "rgba(166,155,155,0.55)"
      );
    }
  }, [modes]);

  const refs = useRef([]);
  refs.current = [];

  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  function addActivelyClasses(i) {
    $("#bigImg").fadeOut(500);
    // $("#bigimg").removeClass("myElement2")
    refs.current[i].classList.add("actively");
    for (let j = 0; j < product?.images?.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("actively");
      }
    }
  }
  // this function copies the product Id
  function copies() {
    let copy = document.getElementById("prodId").innerHTML;
    navigator.clipboard.writeText(copy);
    alert.success("Copied to clipboard");
  }
  $(".colDiv").click(() => {
    let alr = $(this).text();
    console.log("this is", alr);
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product?.name}`} />
          {product ? (
            <>
              <div className="withbtnsbf">
                <div className="ProductDetails">
                  <div className="longdiv">
                    <div className="lefter">
                      <div className="left_1">
                        {product?.images &&
                          product?.images?.length > 0 &&
                          product?.images?.map((item, i) => (
                            <div
                              className={
                                i === 0
                                  ? "image_Wrapper actively"
                                  : "image_Wrapper"
                              }
                              onClick={() => {
                                addActivelyClasses(i);
                                setImage(i);
                              }}
                              ref={addRefs}
                            >
                              <img
                                // data-aos="fade-up"
                                className="smallImg"
                                key={i}
                                src={item.url}
                                alt={`${i} Slide`}
                              />
                            </div>
                          ))}
                      </div>
                      <div className="left_2">
                        {product?.images &&
                          product?.images?.length > 0 &&
                          product?.images?.map((item, index) => (
                            <>
                              <div
                                className={
                                  index === image ? "slide active" : "slide"
                                }
                                key={index}
                              >
                                {index === image && (
                                  <img
                                    src={item.url}
                                    alt="travel image"
                                    className="bigImg image"
                                  />
                                )}
                              </div>
                              {/* <img
                            src={product?.images[image].url}
                            className="bigImg"
                            id="bigImg"
                          /> */}
                              <div className="bigOverlay">
                                <div
                                  className="slide_arrows arlef"
                                  onClick={() => {
                                    addActivelyClasses(
                                      image === 0
                                        ? product?.images?.length - 1
                                        : image - 1
                                    );
                                    setImage((image) =>
                                      image === 0
                                        ? product?.images?.length - 1
                                        : image - 1
                                    );
                                  }}
                                >
                                  <IoIosArrowBack />
                                </div>
                                <div
                                  className="slide_arrows arrig"
                                  onClick={() => {
                                    addActivelyClasses(
                                      image === product?.images?.length - 1
                                        ? 0
                                        : image + 1
                                    );
                                    setImage((image) =>
                                      image === product?.images?.length - 1
                                        ? 0
                                        : image + 1
                                    );
                                  }}
                                >
                                  <IoIosArrowForward />
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="secondbox screv">
                    <div className="detailsBlock-1">
                      <h2 data-aos="fade-up" className="mainHeading">
                        {product?.name}
                      </h2>
                    </div>

                    <div className="detailsBlock-3">
                      <div className="priceFlex flexspar">
                          <span className=" selectSpan coloror">Price Rs.</span>{" "}
                          <div className="humSathHain">

                        <h1 data-aos="fade-up coloror">
                          {` ${
                            product?.sales
                            ? (product?.price -
                              product?.price * (product?.sales / 100)) *
                              quantity
                              : product?.price * quantity
                            }`}
                        </h1>
                        <h5 data-aos="fade-up" className="mx-2">
                          <strike>
                            {product?.sales ? product?.price * quantity : ""}
                          </strike>
                        </h5>
                            </div>
                      </div>
                      <div className="detailsBlock-3-1">
                        <span className="selectSpan coloror">
                          Select Quantity :{" "}
                        </span>
                        <div className="detailsBlock-3-1-1">
                          <button
                            data-aos="fade-up"
                            onClick={() => decreaser()}
                          >
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
                            data-aos="fade-up"
                            onClick={() => increaser(product?.Stock)}
                          >
                            +
                          </button>
                        </div>
                        {/* <button data-aos="fade-up">Add to Cart</button> */}
                      </div>
                    </div>
                    <div className="selectSpan colorsDiv">
                      <span className="coloror">Select Colors </span>
                      <div className="insiderCol radio-tile-group">
                        {colorSP?.length > 0
                          ? colorSP &&
                            colorSP.map((s, i) => (
                              <Colors
                                s={s}
                                index={i}
                                modes={modes}
                                setcolor={setColor}
                                key={s}
                              />
                            ))
                          : "❌"}
                      </div>
                    </div>
                    <div className="selectSpan colorsDiv2">
                      <span className="coloror"> Select Sizes: </span>
                      <div className="insiderCol2 radio-tile-group">
                        {sizesSP?.length > 0 &&
                        sizesSP !== undefined &&
                        sizesSP !== "undefined" &&
                        sizesSP !== null
                          ? sizesSP &&
                            sizesSP.map((s, i) => (
                              <Sizes
                                sizes={s}
                                index={i}
                                modes={modes}
                                setsize={setSize}
                                key={s}
                              />
                            ))
                          : "❌"}
                      </div>
                    </div>
                    <div className="textAreaCom">
                      <textarea
                        name="comments"
                        id="comments"
                        cols="30"
                        rows="10"
                        placeholder="Do you want to say something to Seller?"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="UserShippingInfo">
                  <div className="shipMainBox">
                    <h1 className="homeHeading greet">Shipping Info</h1>
                    <div className="inputFields">
                      <input type="text" required className="shipInp shipText" placeholder="Address" />
                      <input type="text" required className="shipInp shipText" placeholder="City"/>
                      <input type="text" required className="shipInp shipText" placeholder="State"/>
                      <input type="text" required className="shipInp shipText" defaultValue={"Pakistan"} readOnly/>
                      <input type="number" required className="shipInp shipText" placeholder="Pin Code"/>
                      <input type="number" required className="shipInp shipText" placeholder="Phone No"/>
                      <input type="number" className="shipInp shipText" placeholder="Phone No 2 (optional)"/>
                    </div>
                  </div>
                </div>
                <div className="paymentMethods">
                <h1 className="homeHeading greet">Payment Methods</h1>
                <div className="payInb">

                <buttons className="paymentsbtn submitReview extraAdd bacol"><img src={easyPaisa} alt="EP" className="payPic"/> Easy Paisa</buttons>
                <buttons className="paymentsbtn submitReview extraAdd bacol disabled" onClick={()=>Swal.fire("Really Sorry Dear", "Sorry for inconvenience. We are working on this Payment method it will be available Soon Inn Shaa Allah", "warning")}><FaHandHoldingUsd className="payfont"/> Cash On Delivery</buttons>
                <buttons className="paymentsbtn submitReview extraAdd bacol disabled" onClick={()=>Swal.fire("Really Sorry Dear", "Sorry for inconvenience. We are working on this Payment method it will be available Soon Inn Shaa Allah", "warning")}><img src={jazzCash} alt="EP" className="payPic2" /> Jazz Cash</buttons>
                </div>
                </div>
                <div className="midBtn">
                  <button className="submitReview extraAdd maraut">
                    order
                  </button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Fragment>
  );
});

export default OrderOptions;
