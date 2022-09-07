import "./App.css";
import React, { useState, useEffect, createContext,useLayoutEffect } from "react";
import Navbar from "./components/layout/Header/Navbar";
import UpperNavbar from "./components/layout/Header/UpperNavbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import LoadingBar from "react-top-loading-bar";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTotop from "./components/Others/ScrollTotop";
import Products from "./components/Product/Products";
import ProductCat from "./components/Product/ProductCat";
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
import Dashboard from "./components/Admin/Dashboard";
import Notallowed from "./components/Others/Notallowed";
import Admin_product_page from "./components/Admin/Admin_product_page";
import Admin_user_page from "./components/Admin/Admin_user_page";
import SearchProducts from "./components/Admin/Admin_Search_features/SearchProducts";
import SearchOrders from "./components/Admin/Admin_Search_features/SearchOrders";
import SearchUsers from "./components/Admin/Admin_Search_features/SearchUsers";
import MakeProductsAdmin from "./components/Admin/AdminMakeProducts/MakeProductsAdmin";


export const barContext = createContext();

const App = React.memo(() => {
  const [showNav, setshowNav] = useState(null);
  const [authAdmin, setauthAdmin] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const { modes } = useSelector((state) => state.DarkMode);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  
  
  useLayoutEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getProduct());
    AOS.init();
    AOS.refresh();
    // return changingState()
  }, []);
  useEffect(() => {
    changingState();
  }, []);
  
  useEffect(() => {
    let checker = window.location.pathname.startsWith("/admin");
    setshowNav(checker);
    // console.log(showNav);
  }, [window.location.pathname]);

  useEffect(()=>{
    setauthAdmin(isAuthenticated)

  },[isAuthenticated])


  window.addEventListener("popstate", () => {
    let checker2 = window.location.pathname.startsWith("/admin");
    setshowNav(checker2);
  });

  if (modes) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }

  const changingState = () => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };
  // const location = useLocation();

  return (
    <>
      <Router>
        <barContext.Provider value={() => changingState()}>
          <ScrollTotop />
          {/* <Routes>
          </Routes> */}
          {/* on admin side we dont need the navbar , uperrnavbar, lowercatnavbar so this condition will not show the navbar when  */}
          <UpperNavbar />
          {showNav !== false ||
            (showNav !== null && (
              <>
                <Navbar modes={modes}/>
                <LowerCatNav />
              </>
            ))}
          <LoadingBar
            color="#FF8C32"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            loaderSpeed={1000}
            height={4}
            shadow={true}
          />
          <Routes>
            <Route
              exact
              path="/admin/dashboard/myDetails"
              element={user?.role === "admin" || user?.role === "admin_one"?  <Dashboard/>:<Notallowed /> }
            />
            <Route
              exact
              path="/admin/dashboard/products"
              element={user?.role === "admin" || user?.role === "admin_one"?  <Admin_product_page/>:<Notallowed /> }
            />
            <Route
              exact
              path="/admin/dashboard/Users"
              element={user?.role === "admin" || user?.role === "admin_one"?  <Admin_user_page/>:<Notallowed /> }
            />
            <Route
              exact
              path="/admin/dashboard/search_Products"
              element={user?.role === "admin" || user?.role === "admin_one"?  <SearchProducts/>:<Notallowed /> }
            />
            <Route
              exact
              path="/admin/dashboard/search_Users"
              element={user?.role === "admin" || user?.role === "admin_one"?  <SearchUsers/>:<Notallowed /> }
            />
            <Route
              exact
              path="/admin/dashboard/search_Orders"
              element={user?.role === "admin" || user?.role === "admin_one"?  <SearchOrders/>:<Notallowed /> }
            />
            <Route
              exact
              path="/admin/dashboard/make_Products/NewProduct"
              element={user?.role === "admin" || user?.role === "admin_one"?  <MakeProductsAdmin/>:<Notallowed /> }
            />
            <Route exact index path="/" element={<Home modes={modes}/>} />
            <Route exact path="/products/:id" element={<ProductDetails />} />
            <Route exact path="/product" element={<Products modes = {modes}/>} />
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
          {showNav !== false || (showNav !== null && <Footer />)}
        </barContext.Provider>
      </Router>
    </>
  );
}, []);
export default App;
