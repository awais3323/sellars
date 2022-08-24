import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./updatePassword.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import profilePng from "../../images/ProfilePng.jpg";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { PASSWORD_UPDATE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const { modes } = useSelector((state) => state.DarkMode);

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword",confirmPassword);

    dispatch(updatePassword(myForm));
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
      console.log(error)
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password is Updated Successfully");
      navigate("/me");
      // dispatch(loadUser());
      dispatch({
        type: PASSWORD_UPDATE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated]);
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
                ? `UpdatePasswordContainer black__bg`
                : `UpdatePasswordContainer`
            }`}
          >
            <div
              className={`${
                modes ? `UpdatePasswordBox black__bg` : `UpdatePasswordBox`
              }`}
            >
              <h2 className="H2main">Update Password</h2>
              <form
                className="UpdatePasswordForm"
                encType="multipart/form-data"
                onSubmit={UpdatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setoldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
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
                  value="Change"
                  className="UpdatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
