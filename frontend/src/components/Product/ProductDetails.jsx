import React, { Fragment, useState, useEffect, useRef } from "react";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Taggers from "../Others/Taggers";
import Product from "../Home/Product";
import Colors from "../Others/Colors";
import Sizes from "../Others/Sizes";
// import { useCallback } from "react";
import Loader from "../layout/Loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteProduct } from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import $ from "jquery";

const ProductDetails = React.memo((props) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { changingState } = props;

  const { loading, products } = useSelector((state) => state.products);
  const { load, isDeleted } = useSelector((state) => state.deleteProduct);
  const { user } = useSelector((state) => state.user);
  const { modes } = useSelector((state) => state.DarkMode);

  // console.log(products)

  const [quantity, setquantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [_hobbit, setHobbit] = useState(null);
  const [colorSP, setcolorSP] = useState(null);
  const [sizesSP, setsizesSP] = useState(null);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  // const [filReviews,setfilReviews]= useState(null)
  // console.log(rating)
  const options = {
    edit: false,
    color: "grey",
    activeColor: "#FF8C32",
    size: window.innerWidth < 600 ? 17 : 25,
    value: product?.ratings,
    isHalf: true,
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  useEffect(() => {
    if (isDeleted) {
      Swal.fire("Product Deleted", "Best Of Luck for Future.", "success");
      navigate("/");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [isDeleted]);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success(`${product?.name} has been added to cart`);
  };

  function copies() {
    let copy = document.getElementById("prodId").innerHTML;
    navigator.clipboard.writeText(copy);
    alert.success("Copied to clipboard");
  }

  let onlytags = product?.Tags?.map((s) => s);
  // console.log(onlytags)
  var arr;
  onlytags?.forEach((element) => {
    arr = Object.values(element);
  });
  if (arr) {
    arr.pop();
  }
  // console.log(arr)

  function orderOpt(){
    navigate(`/order/options`)
  }

  // this function get all the products and show the products to the users that is according to the taste and tags of the products that he is currently reviewing or watching. in more suggesstions
  const cal_rel_prods = () => {
    //separating the products according to the id and the category of the shown or current product
    let filli = products.filter(
      (s) =>
        s.category.toUpperCase() === product?.category.toUpperCase() &&
        s._id !== product?._id
    );
    // console.log("I am filli",filli)
    var killi = [];
    // checking the products according to the current products tags. by nested looping
    products.forEach((ele) => {
      let elements = ele.Tags.map((s) => s);
      let tempArr;
      elements.forEach((els) => {
        tempArr = Object.values(els);
        tempArr.pop();
      });
      if (arr) {
        arr.forEach((ely) => {
          if (tempArr !== undefined) {
            if (tempArr.includes(ely)) {
              killi.push(ele);
            }
          }
        });
      }
    });
    // getting unique values in killi
    let gandalf = [...new Set(killi)];
    //joining both of the filli and unique products of killi.
    let thorin = [...filli, ...gandalf];
    let dragon = [...new Set(thorin)];
    let hobbitiers = dragon.filter((s) => s._id !== product?._id);
    return hobbitiers;
  };

  // calling the fucntion on the condition of change of the current product.
  useEffect(() => {
    let hobbit = cal_rel_prods();
    //  extractReviews();
    setHobbit(hobbit);
  }, [product]);
  useEffect(() => {
    if (product?.colors !== "undefined") {
      var colSP = product?.colors?.split(",");
    }
    if (product?.sizes !== "undefined") {
      var sizSP = product?.sizes?.split(",");
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
  // const render = React.useRef(0)
  const MySwal = withReactContent(Swal);

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
  return (
    <Fragment>
      {loading || load ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product?.name}`} />
          {product ? (
            <>
              <div className="ProductDetails">
                {/* style={{ backgroundColor: 'grey'}}    >renders {renders.current++}</p> */}
                {/* <h1>{render.current++}</h1> */}

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
                <div className="secondbox">
                  <div className="detailsBlock-1">
                    <h2 data-aos="fade-up" className="mainHeading">
                      {product?.name}
                    </h2>
                    <div className="copier">
                      <p className="idpara">
                        Product Id: <span id="prodId">{product?._id}</span>
                      </p>
                      <p className="logoCopy" onClick={() => copies()}>
                        Copy
                      </p>
                    </div>
                    {/* {
              colorSP !== undefined && colorSP.length >0? */}

                    {/* } */}
                  </div>
                  <div className="colorsDiv">
                    <span>Colors </span>
                    <div className="insiderCol radio-tile-group">
                      {colorSP?.length > 0
                        ? colorSP &&
                          colorSP.map((s) => (
                            <Colors s={s} modes={modes} setcolor={setColor} key={s} />
                            // console.log(s)
                          ))
                        : "❌"}
                    </div>
                  </div>
                  <div className="colorsDiv">
                    <span>Sizes: </span>
                    <div className="insiderCol radio-tile-group">
                      {sizesSP?.length > 0 &&
                      sizesSP !== undefined &&
                      sizesSP !== "undefined" &&
                      sizesSP !== null
                        ? sizesSP &&
                          sizesSP.map((s) => (
                            <Sizes sizes={s} modes={modes} setsize={setSize} key={s} />
                            // console.log(s)
                          ))
                        : "❌"}
                    </div>
                  </div>
                  <div className="detailsBlock-2">
                    <span className="detailsBlock-2-span" data-aos="fade-up">
                      <ReactStars {...options} /> ({product?.numOfReviews}{" "}
                      Reviews)
                    </span>
                    {product?.sales ? (
                      <span
                        className="detailsBlock-2-span-2"
                        data-aos="fade-up"
                      >
                        {`${product?.sales}% Sale`}
                      </span>
                    ) : (
                      ""
                    )}
                    {product?.limited !== "none" &&
                    product?.limited !== false &&
                    product?.limited ? (
                      <span
                        className="detailsBlock-2-span-2"
                        data-aos="fade-up"
                      >
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
                          ? product?.price -
                            product?.price * (product?.sales / 100)
                          : product?.price
                      }`}</h1>
                      <h5 data-aos="fade-up" className="mx-2">
                        <strike>{product?.sales ? product?.price : ""}</strike>
                      </h5>
                    </div>
                  

                    <p>
                      Status:
                      <b
                        // data-aos="fade-up"
                        className={
                          product?.Stock < 1 ? "redColor" : "greenColor"
                        }
                      >
                        {product?.Stock < 1 ? " OutOfStock" : " InStock"}

                      </b>
                      {/* <p className="stockPara"> <span className="stockParaSpan">({product?.Stock})</span> Left</p> */}
                    </p>
                    <span className="headingTags">Tags :</span>
                    <div className="hell">
                      {arr &&
                        arr.map((tags) => <Taggers key={tags} tags={tags} />)}
                    </div>
                  </div>
                  <div className="detailsBlock-4">
                    <span data-aos="fade-up">Description : </span>
                    <p className="my-2">{product?.description}</p>
                  </div>
                  <div className="twobuts">
                    <Link data-aos="fade-up" className="submitReview extraAdd" to={`/order/options/${id}`} >
                      Order Now
                    </Link>
                    {/* <Popup/> */}
                    <button
                      data-aos="fade-up"
                      className="submitReview extraAdd"
                      onClick={() => addToCartHandler()}
                    >
                      Add to Cart
                    </button>


                  </div>
                  {user?.role === "admin_one" || user?._id === product?.user ? (
                    <div className="userDiv">
                      <div className="ftBox">
                        <p className="userInfo">
                          User Id : <span>{product?.user}</span>
                        </p>
                        <p className="userInfo">
                          Created At :{" "}
                          <span>
                            {product?.createdAt.split("T")[0]}{" "}
                            <span className="coloror">Time:</span>{" "}
                            {product?.createdAt.split("T")[1].slice(0, 9)}
                          </span>
                        </p>
                      </div>
                      <div className="stBox">
                        <button
                          data-aos="fade-up"
                          className="submitReview extraAdd"
                          onClick={() =>
                            MySwal.fire({
                              title: `Do you really want to delete " ${product?.name} " ?`,
                              text: `ID: ${product?._id} 
                • Deleting the Product will no delete the orders that are already placed you have to deliver them or else you will get strike`,
                              icon: "warning",
                              showCancelButton: false,
                              confirmButtonColor: "#FF8C32",
                              confirmButtonText: "Yes, I am sure 100% ",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                // location = "somewhereelse.html"
                                dispatch(deleteProduct(id));
                                console.log("Hello");
                              }
                            })
                          }
                          // to={`/admin/dashboard/DeleteProduct/${product?._id}`}
                        >
                          Delete Product
                        </button>
                        <Link
                          data-aos="fade-up"
                          className="submitReview extraAdd"
                          // onClick={() => addToCartHandler()}
                          to={`/admin/dashboard/EditProduct/${product?._id}`}
                        >
                          Edit Product
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <h3 className="homeHeading greet" data-aos="fade-up">
                REVIEWS
              </h3>
              {product?.reviews?.length > 0 ? (
                <div className="reviewContainer">
                  {/* <fieldset> */}
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
                </div>
              ) : (
                ""
              )}
              {product?.reviews && product?.reviews[0] ? (
                <div className="reviews">
                  {product?.reviews &&
                    product?.reviews
                      ?.filter((s) => s?.rating >= rating)
                      .map((review) => (
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
            </>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Fragment>
  );
});

export default ProductDetails;
