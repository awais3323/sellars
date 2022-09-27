import React, { useState, Fragment, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { PASSWORD_UPDATE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';


const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.forgotPassword);
  const { modes } = useSelector((state) => state.DarkMode);

  const [password, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { token } = useParams();

  const ResetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token,myForm));
  };

  var root = document.querySelector(":root");
  if (modes) {
    root.style.setProperty("--customColor", "white");
    root.style.setProperty("--customColorin", "rgba(0, 0, 0, 0.678)");
  } else {
    root.style.setProperty("--customColor", "black");
    root.style.setProperty("--customColorin", "white");
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password is updated successfully");
      navigate("/LogSign");
      // dispatch(loadUser());
      dispatch({
        type: PASSWORD_UPDATE_RESET,
      });
    }
  }, [dispatch, error, alert, success])
  return (
    <Fragment>
    <MetaData title={"Password changing"} />
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <div
          className={`${
            modes
              ? `ResetPasswordContainer black__bg`
              : `ResetPasswordContainer`
          }`}
        >
          <div
            className={`${
              modes ? `ResetPasswordBox black__bg` : `ResetPasswordBox`
            }`}
          >
            <h2 className="H2main">Update Password</h2>
            <form
              className="ResetPasswordForm"
              encType="multipart/form-data"
              onSubmit={ResetPasswordSubmit}
            >
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setnewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) =>setconfirmPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Update"
                className="ResetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword