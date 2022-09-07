import React, { Fragment, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
import { useRef } from "react";
import { useCallback } from "react";
import Loader from "../layout/Loader/Loader";


const ProductDetails = React.memo((props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

const {changingState} = props

  const { loading,products } = useSelector((state) => state.products);
  // const { user } = useSelector((state) => state.user);
  const { modes } = useSelector((state) => state.DarkMode);

  // console.log(products)

  const [quantity, setquantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [_hobbit,setHobbit]= useState(null);
  const [colorSP,setcolorSP]= useState(null);
  const [sizesSP,setsizesSP]= useState(null);
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
  window.addEventListener("load", changingState);

    let prodi = products.filter((s) => s._id === id);
    if (prodi) {
      var product = prodi[0];
    }
  
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


// this function is for extracting the reviews from the current watching product
  // function extractReviews(){
  //   let revProds = product?.reviews?.filter((s) => s?.rating >= rating)
  //   setfilReviews(revProds)
  //   console.log(revProds)
  // }
  // this function copies the product Id
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
    }

// this funcition get all the products and show the products to the users that is according to the taste and tags of the products that he is currently reviewing or watching. in more suggesstions
const  cal_rel_prods = useCallback(() =>{
  //separating the products according to the id and the category of the shown or current product
  let filli = products.filter(
    (s) => s.category.toUpperCase() === product?.category.toUpperCase() && s._id !== product?._id
  );
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
  
},[products])

// calling the fucntion on the condition of change of the current product.
useEffect(()=>{
  let hobbit = cal_rel_prods();
  //  extractReviews();
  setHobbit(hobbit)
  },[product])
  useEffect(()=>{
      var colorSP = product?.colors?.split(",");
      var sizeSP = product?.sizes?.split(",");
      setcolorSP(colorSP)
      setsizesSP(sizeSP)
    },[product?.colors])



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
  // const render = useRef(0)
  return (
    <Fragment>
      {
        loading?<Loader/>:

    <Fragment>
      <MetaData title={`${product?.name}`} />
      {/* <h1>{render.current++}</h1> */}
      <div
        className="ProductDetails"
      >
        {/* style={{ backgroundColor: 'grey'}}    >renders {renders.current++}</p> */}
        
        <div className="longdiv">
          <Carousel
            autoPlay={false}
            animation="slide"
            swipe={true}
            cycleNavigation={true}
            navButtonsAlwaysVisible={true}
            // onChange={(next,prev)=>console.log(`this is next ${next} this is previous ${prev}`)}
            navButtonsProps={{
              style: {
                backgroundColor: "rgba(0, 0, 0, 0.635)",
                color:"white",
                fontSize:"10px",
                padding:"0.51vmax",
                // margin:"0.3vmax",
                borderRadius: "50%",
              },
            }}
      
          activeIndicatorIconButtonProps={{
              style: {
                  color: '#ff8c32' 
              }
          }}
        
          >
            {product?.images &&
              product?.images?.map((item, i) => (
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
            <span >Colors : </span>
            <div className="insiderCol">
                {
                  colorSP?.length > 0? colorSP && colorSP.map((s)=>(
                  <Colors s={s} modes={modes} key={s}/>
                  // console.log(s)
                  ))
               :"❌" }
                  </div>
              </div>
          <div className="colorsDiv2">
            <span >Sizes : </span>
            <div className="insiderCol2">
                {
                  sizesSP?.length > 0? sizesSP.map((s)=>(
                  <Sizes sizes={s} modes={modes} key={s}/>
                  // console.log(s)
                  ))
               :"❌" }
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
                  className={`mx-3 numberinp ${modes ? `whiteC` : `blackC`}`}
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
            {/* <button data-aos="fade-up" className="submitReview">
              Edit Product
            </button>
            <button
              data-aos="fade-up"
              className="submitReview extraAdd"
            >
              Delete Product
            </button> */}
          </div>
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
                setRating(newRating) 
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
            (product?.reviews?.filter((s) => s?.rating >= rating)).map((review) => (
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
          }
</Fragment>
  );
})

export default ProductDetails;
