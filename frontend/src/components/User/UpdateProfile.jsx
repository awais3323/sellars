import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import profilePng from "../../images/ProfilePng.jpg";
import FaceIcon from "@material-ui/icons/Face";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { PROFILE_UPDATE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const { modes } = useSelector((state) => state.DarkMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);


  const UpdateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const UpdateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
    alert.success("Please also select your image otherwise profile will not be edited")
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      setAvatar(user.avatar.url)
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile is Updated Successfully");
      navigate("/me");
      dispatch(loadUser());
      dispatch({
        type: PROFILE_UPDATE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, user]);

  return (
    <Fragment>
      <MetaData title={"Profile Update"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div
            className={`${
              modes
                ? `UpdateProfileContainer black__bg`
                : `UpdateProfileContainer`
            }`}
          >
            <div
              className={`${
                modes ? `UpdateProfileBox black__bg` : `UpdateProfileBox`
              }`}
            >
              <h2 className="H2main">Update Profile</h2>
              <form
                className="UpdateProfileForm"
                encType="multipart/form-data"
                onSubmit={UpdateProfileSubmit}
              >
                <div id="UpdateProfileImage">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="UpImg"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={UpdateProfileDataChange}
                  />
                </div>
                <div className="UpdateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="UpdateProfileEmail">
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
                  value="Update"
                  className="UpdateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
