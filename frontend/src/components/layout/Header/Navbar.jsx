import React, { useState, useEffect,useContext } from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { setDarkMode } from "../../../actions/otherActions";
import { barContext } from "../../../App";
import { useRef } from "react";

const Navbar = React.memo((props) => {
  const topload = useContext(barContext)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navbar, setnavbar] = useState(false);
  const [search, setsearch] = useState(false);
  const [keyword, setkeyword] = useState("");

  let { modes } = props;

  const onChangeclick = () => {
    let modeSet;
    if (modes) {
      modeSet = false;
      localStorage.setItem("moding", false);
    } else {
      modeSet = true;
      localStorage.setItem("moding", true);
    }
    topload();
    dispatch(setDarkMode(modeSet));
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    dispatch(setDarkMode());
  }, [dispatch]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    topload();
    if (keyword.trim()) {
      navigate(`/product/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };


  useEffect(() => {
    window.onscroll = () => {
      setnavbar(window.pageYOffset <= 5 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  // const changeSearchBar = () => {
  //   if (search === false) {
  //     setsearch(true);
  //   } else {
  //     setsearch(false);
  //   }
  // };

  // window.addEventListener("scroll", NavbarFixing);

  // let render = useRef(0)
  return (
    <>
    {/* <h1>{render.current++}</h1> */}
      {search ? (
        <div
          className={`container ${modes === true ? `blackImp` : `whiteImp`}`}
          style={{ backgroundColor: "red" }}
        >
          <form
            className="d-flex px-2 py-2 my-2"
            onSubmit={searchSubmitHandler}
          >
            <input
              autoFocus
              className={`form-control me-2 green-text ${
                modes ? `blackImp whiteC` : `whiteImp blackC`
              }`}
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setkeyword(e.target.value)}
            />
            <button className="btn btn-mine" type="submit">
              &#8594;
            </button>
            <FaAngleUp
              className="mx-3 fs-2 green-text"
              // onClick={changeSearchBar}
            />
          </form>
        </div>
      ) : (
        <nav
          className={` ${
            navbar
              ? `navbar navbar-expand-lg navbar-${modes ? `dark` : `light`} bg-light fixed-top navbar-boxShadow ${modes ? "blackImp" : "whiteImp"}`
              : `navbar navbar-expand-lg navbar-${ modes ? `dark` : `light`} bg-light ${ modes ? "blackImp" : "whiteImp"}`
          }`}
        >
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="modeBox">
              <button
                className="modeBtn modeBtn1"
                onClick={() => onChangeclick()}
                style={{
                  color: `${modes ? "white" : "black"}`,
                  backgroundColor: `${modes ? "black" : "white"}`,
                }}
              >
                {/* {`${modes ? "☀️" : "🌙"}`} */}
                {`${modes ? "Light ☀️" : "Dark 🌙"}`}
              </button>
            </div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mx-auto mb-lg-0">
                <li className="nav-item px-2 py-2">
                  <Link
                    className="nav-link active green-text green-text-border"
                    aria-current="page"
                    to="/"
                    onClick={()=> topload()}

                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item px-2 py-2">
                  <a className="nav-link green-text-border" href="#">
                    About Us
                  </a>
                </li>
                <li className="nav-item px-2 py-2">
                  <a className="nav-link green-text-border" href="#">
                    Admins                    
                  </a>
                </li>
                <li className="nav-item dropdown px-2 py-2">
                  <a
                    className="nav-link dropdown-toggle green-text-border"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products
                  </a>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                    style={{
                      backgroundColor: `${modes ? "black" : "white"}`,
                      border: `${modes ? "2px solid grey" : "2px solid grey"}`,
                    }}
                  >
                    <li>
                      <Link
                        className="dropdown-item green-text-border-side"
                        to="/product"
                        onClick={()=> topload()}
                        style={{
                          color: `${modes ? "grey" : "black"}`,
                        }}
                      >
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item green-text-border-side"
                        to="/sale"
                        onClick={()=> topload()}
                        style={{
                          color: `${modes ? "grey" : "black"}`,
                        }}
                      >
                        Sale Products
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item green-text-border-side"
                        to="/limited"
                        onClick={()=> topload()}
                        style={{
                          color: `${modes ? "grey" : "black"}`,
                        }}
                      >
                        Limited Products
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown px-2 py-2">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown green-text-border"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <ul
                    className="dropdown-menu "
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item green-text-border-side"
                        href="#"
                      >
                        Action
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item green-text-border-side"
                        href="#"
                      >
                        Another action
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item green-text-border-side"
                        href="#"
                      >
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <FaSearch
              className="mx-2 OH-green-text"
              // onClick={changeSearchBar}
              style={{ color: `${modes ? `white` : `black`}` }}
            />
          </div>
        </nav>
      )}
    </>
  );
});

export default Navbar;
