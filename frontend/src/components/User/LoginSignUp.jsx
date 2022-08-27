import React, {
  useRef,
  useState,
  Fragment,
  useEffect,
  useContext,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import profilePng from "../../images/ProfilePng.jpg";
import FaceIcon from "@material-ui/icons/Face";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { barContext } from "../../App";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { gapi } from "gapi-script";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const topload = useContext(barContext);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const { modes } = useSelector((state) => state.DarkMode);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState(" ");
  const [loginPassword, setLoginPassword] = useState(" ");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(profilePng);
  const [avatarPreview, setAvatarPreview] = useState(profilePng);

  const loginSubmit = (e) => {
    e.preventDefault();
    let logger = loginEmail.toLowerCase();
    dispatch(login(logger, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

      myForm.set("name", name);
    myForm.set("email", email.toLowerCase());
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    // console.log(avatar)

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/me");
    }
  }, [dispatch, error, alert, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  var root = document.querySelector(":root");
  if (modes) {
    root.style.setProperty("--customColor", "white");
    root.style.setProperty("--customColorin", "rgba(0, 0, 0, 0.678)");
  } else {
    root.style.setProperty("--customColor", "black");
    root.style.setProperty("--customColorin", "white");
  }

  function SucresponseGoogle(res) {
    // console.log(typeof(res.profileObj.googleId))
    const number = res.profileObj.googleId;
    let newstr = number.replace(/1/g, "sell");
    let newstr_2 = newstr.replace(/0/g, "ars");
    // setLoginPassword(newstr_2);
    let sender = res.profileObj.email.toLowerCase()
    dispatch(login(sender, newstr_2));
  }

  function SucresponseGoogle_two(res) {
    const number = res.profileObj.googleId;
    let newstr = number.replace(/1/g, "sell");
    let newstr_2 = newstr.replace(/0/g, "ars");
    const regForm = new FormData();

    regForm.set("name", res.profileObj.name);
    regForm.set("email", res.profileObj.email);
    regForm.set("password", newstr_2);
    regForm.set("avatar", res.profileObj.imageUrl);


    dispatch(register(regForm));
  }
  function FairesponseGoogle(res) {
  }
  const clientID =
    "13911652568-pnf2r42dd6pitg1skhj1af5qs1vimrl6.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);


  function LO_responseFacebook(res){
    // console.log(res)
  }
  function RE_responseFacebook(res){
    // console.log(res)
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="upauth"></div>
          <div
            className={`${
              modes ? `LoginSignUpContainer black__bg` : `LoginSignUpContainer`
            }`}
          >
            <div
              className={`${
                modes ? `LoginSignUpBox black__bg` : `LoginSignUpBox`
              }`}
            >
              <div>
                <div className="login_signUp_toggle">
                  <p
                    onClick={(e) => switchTabs(e, "login")}
                    style={{ fontFamily: "poppins" }}
                  >
                    LOGIN
                  </p>
                  <p
                    onClick={(e) => switchTabs(e, "register")}
                    style={{ fontFamily: "poppins" }}
                  >
                    REGISTER
                  </p>
                </div>

                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link
                  to="/password/forgot"
                  className="forgetpass"
                  style={{ fontFamily: "poppins" }}
                >
                  Forget Password ?
                </Link>
                <input
                  type="submit"
                  value="Continue with email"
                  className="loginBtn"
                  style={{ fontFamily: "poppins" }}
                />
                <GoogleLogin
                  clientId="13911652568-pnf2r42dd6pitg1skhj1af5qs1vimrl6.apps.googleusercontent.com"
                  buttonText="Continue with Google"
                  onSuccess={SucresponseGoogle}
                  onFailure={FairesponseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                {/* <FacebookLogin
                  appId="5358648967583788"
                  autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  callback={LO_responseFacebook}
                /> */}
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Continue with email"
                  className="signUpBtn"
                  onClick={() => topload()}
                  style={{ fontFamily: "poppins" }}
                />
                <GoogleLogin
                  clientId="13911652568-pnf2r42dd6pitg1skhj1af5qs1vimrl6.apps.googleusercontent.com"
                  buttonText="Continue with Google"
                  onSuccess={SucresponseGoogle_two}
                  onFailure={FairesponseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                {/* <FacebookLogin
                  appId="5358648967583788"
                  autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  callback={RE_responseFacebook}
                /> */}
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
