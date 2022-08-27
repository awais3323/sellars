import "./App.css";
import React, { useState, useEffect, createContext} from "react";
import Navbar from "./components/layout/Header/Navbar";
import UpperNavbar from "./components/layout/Header/UpperNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails";
import LoadingBar from "react-top-loading-bar";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTotop from "./components/Others/ScrollTotop";
import Products from "./components/Product/Products.js";
import ProductCat from "./components/Product/ProductCat.js";
import LowerCatNav from "./components/layout/Header/LowerCatNav";
import { useSelector } from "react-redux";
import SaleProducts from "./components/Product/SaleProducts";
import Limitedproducts from "./components/Product/Limitedproducts";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/cart/Cart";
import { getProduct } from "./actions/productAction";
// import { useAlert } from "react-alert";


export const barContext = createContext();

const App=React.memo(() =>{
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getProduct());
    AOS.init();
    AOS.refresh();
    changingState();
    // return changingState()
  }, []);

  const { modes } = useSelector((state) => state.DarkMode);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { progressive } = useSelector((state) => state.toploader);
  if (modes) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }
  const [progress, setProgress] = useState(0);

  const changingState = () => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };


  // window.addEventListener("unload",changingState())

  return (
    <>
      <Router>
        <barContext.Provider value={() => changingState()}>
          <ScrollTotop />
          <UpperNavbar />
          <Navbar />
          <LowerCatNav />
          <LoadingBar
            color="#FF8C32"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            loaderSpeed={1000}
            height={4}
            shadow={true}
          />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products/:id" element={<ProductDetails />} />
            <Route exact path="/product" element={<Products />} />
            <Route exact path="/sale" element={<SaleProducts />} />
            <Route exact path="/limited" element={<Limitedproducts />} />
            <Route path={"/product/:keyword"} element={<Products />} />
            <Route path={"/producters/:keyword"} element={<ProductCat />} />
            <Route path={"/LogSign"} element={<LoginSignUp />} />
            <Route
              exact
              path={"/me"}
              element={isAuthenticated ? <Profile /> : <LoginSignUp />}
            />
            <Route
              path={"/me/update"}
              element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />}
            />
            <Route
              exact
              path={"/password/update"}
              element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />}
            />
            <Route
              exact
              path={"/password/forgot"}
              element={<ForgotPassword />}
            />
            <Route
              exact
              path={"/password/reset/:token"}
              element={<ResetPassword />}
            />
            <Route
              exact
              path={"/cart"}
              element={isAuthenticated ? <Cart /> : <LoginSignUp />}
            />
        
          </Routes>
          <Footer />
        </barContext.Provider>
      </Router>
    </>
  );
},[]
)
export default App;
