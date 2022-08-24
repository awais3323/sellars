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
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

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
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="upauth">
         
          </div>
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
                  <p onClick={(e) => switchTabs(e, "login")} style={{ fontFamily: "poppins" }}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")} style={{ fontFamily: "poppins" }}>REGISTER</p>
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
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
