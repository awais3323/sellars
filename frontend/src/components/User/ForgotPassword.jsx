import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { loading, message, error } = useSelector((state) => state.forgotPassword);
  const { modes } = useSelector((state) => state.DarkMode);

  const [email, setEmail] = useState("")

  const ForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success("Message has been sent on your Email");
    }
  }, [dispatch, error, alert, message]);
  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div
            className={`${
              modes
                ? `ForgotPasswordContainer black__bg`
                : `ForgotPasswordContainer`
            }`}
          >
            <div
              className={`${
                modes ? `ForgotPasswordBox black__bg` : `ForgotPasswordBox`
              }`}
            >
              <h2 className="H2main">Forgot Password</h2>
              <form
                className="ForgotPasswordForm"
                onSubmit={ForgotPasswordSubmit}
              >
                <div className="ForgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="ForgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ForgotPassword