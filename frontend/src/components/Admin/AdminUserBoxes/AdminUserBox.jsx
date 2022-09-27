import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerUsersDates,
  updateUser,
  clearErrors,
  strikeUser,
  loadUser,
  updateUserBadge,
} from "../../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader/Loader";
import "./../../User/Profile.css";
import { barContext } from "../../../App";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  UPDATE_USER_RESET,
  STRIKE_USER_RESET,
  BADGE_USER_RESET,
} from "../../../constants/userConstant";
import { useAlert } from "react-alert";
import Strikes from "./Strikes";

const AdminUserBox = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  let { id } = useParams();

  const { user } = useSelector((state) => state.user);
  let { sellusers } = useSelector((state) => state.sellUserDates);
  let { isStriked, loadstr } = useSelector((state) => state.strike);
  let { userBadged, lodbad } = useSelector((state) => state.badge);
  let {
    error: updateError,
    isUpdated,
    loading,
  } = useSelector((state) => state.profile);

  const [userer, setuser] = useState("");
  const [show, setshow] = useState(false);
  const [badge_list, setbadge_list] = useState("");

  const topload = useContext(barContext);

  useEffect(() => {
    dispatch(getSellerUsersDates());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (sellusers) {
      let filters = sellusers.filter((s) => s._id === id);
      setuser(filters);
    }
  }, [sellusers !== undefined]);

  useLayoutEffect(() => {
    let badges_array = ["bronze", "silver", "gold", "platinum", "diamond"];
    badges_array.unshift(userer[0]?.badge);
    let uniqueArray = new Set(badges_array);
    setbadge_list([...uniqueArray]);
  }, [userer]);

  const MySwal = withReactContent(Swal);

  function sendTheUpdater() {
    // e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", document.getElementById("namer").innerHTML.trim());
    myForm.set("email", document.getElementById("emailer").innerHTML.trim());
    myForm.set("role", document.getElementById("roler").innerHTML.trim());

    dispatch(updateUser(id, myForm));
  }

  function BadgeUpdater() {
    // e.preventDefault()
    dispatch(updateUserBadge(id, document.getElementById("year").value.trim()));
  }

  useEffect(() => {
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      Swal.fire(`${userer[0]?.name} Role is updated`, "Job is Done", "success");

      dispatch({ type: UPDATE_USER_RESET });
      dispatch(loadUser());
      // navigate(`/admin/dashboard/search_Users`);
    }
  }, [isUpdated, alert, updateError, dispatch]);

  function userStriker() {
    const myForm = new FormData();
    myForm.set("subject", document.getElementById("strikeInput").value.trim());
    myForm.set(
      "Description",
      document.getElementById("strikeTextArea").value.trim()
    );

    dispatch(strikeUser(id, myForm));
  }

  useLayoutEffect(() => {
    if (isStriked) {
      dispatch(loadUser());
      // alert.success("Strike Updated Successfully");
      Swal.fire(`${userer[0]?.name}`, "Job is Done", "success");
      // navigate(`/admin/dashboard/search_Users`)
      dispatch({ type: STRIKE_USER_RESET });
    }
  }, [isStriked]);
  useLayoutEffect(() => {
    if (userBadged) {
      // alert.success("Strike Updated Successfully");
      Swal.fire(
        `${userer[0]?.name} badge is upgraded`,
        "Job is Done",
        "success"
      );
      // navigate(`/admin/dashboard/search_Users`)
      dispatch({ type: BADGE_USER_RESET });
      dispatch(loadUser());
    }
  }, [userBadged]);

  return (
    <>
      {loading || loadstr || lodbad ? (
        <Loader />
      ) : (
        <>
          {userer !== null || userer !== undefined ? (
            <>
              <MetaData title={`${userer[0]?.name}'s profile`} />
              <div className="mainUserCont">
                <div className="profileContainer version2">
                  <div className="firstContainer">
                    <img
                      src={userer[0]?.avatar?.url}
                      alt={userer[0]?.name}
                      className="avatar"
                    />
                  </div>
                  <div className="SideSection sidVer2">
                    <div className="nameUser">
                      <h4 className="headTitle">Full Name:</h4>
                      <h5 className="Othertitle" id="namer">
                        {userer[0]?.name}
                      </h5>
                    </div>
                    <div className="nameUser">
                      <h4 className="headTitle">Email:</h4>
                      <h5 className="Othertitle" id="emailer">
                        {userer[0]?.email}
                      </h5>
                    </div>
                    <div className="nameUser">
                      <h4 className="headTitle">ID:</h4>
                      <h5 className="Othertitle">{userer[0]?._id}</h5>
                    </div>
                    <div className="nameUser">
                      <h4 className="headTitle">Badge:</h4>
                      <h5 className="Othertitle">
                        {userer[0]?.badge.toUpperCase()}
                      </h5>
                    </div>
                    <div className="nameUser">
                      <h4 className="headTitle">Role:</h4>
                      <h5 className="Othertitle">
                        {userer[0]?.role.toUpperCase()}
                      </h5>
                    </div>
                    <div className="nameUser">
                      <h4 className="headTitle">Joined On:</h4>
                      <h5 className="Othertitle other_two">
                        {userer[0]?.createdAt.split("T")[0]}{" "}
                        <span className="coloror"> Time:</span>{" "}
                        {userer[0]?.createdAt.split("T")[1].slice(0, 9)}
                      </h5>
                    </div>
                    {user?.role === "admin_one" ? (
                      <>
                        <div className="nameUser">
                          <h4 className="headTitle ">Appoint him/her as:</h4>
                          <button
                            id="roler"
                            className="editProfilebtn shorter2"
                            onClick={() =>
                              MySwal.fire({
                                title: `Do you really want to Appoint " ${
                                  userer[0]?.name
                                } " to " ${
                                  userer[0]?.role === "user" ? "admin" : "user"
                                } "?`,
                                text: `ID: ${userer[0]?._id} 
                • Reminder : If you will update the role of the any user their access and priorities will be changed so have look before updating`,
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#FF8C32",
                                confirmButtonText: "Yes, I am sure 100% ",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  // location = "somewhereelse.html"
                                  //   dispatch(deleteProduct(id))
                                  sendTheUpdater();
                                }
                              })
                            }
                          >
                            {userer[0]?.role === "user" ? "admin" : "user"}
                          </button>
                        </div>
                        <div className="dropDownBadges">
                          <h4 className="headTitle ">Badge User To:</h4>
                          <select
                            id="year"
                            className="editProfilebtn shorter2"
                            onClick={() =>
                              MySwal.fire({
                                title: `Do you really want to update the badge of " ${
                                  userer[0]?.name
                                } " to " ${
                                  document.getElementById("year").value
                                } "?`,
                                text: `ID: ${userer[0]?._id} 
                • Reminder : Remember the badges are the trust ranks and factor of the sellers so do the change the badge but beaware of the consequences because it is a guarantee of trust to the`,
                                icon: "warning",
                                showCancelButton: false,
                                confirmButtonColor: "#FF8C32",
                                confirmButtonText: "Yes, I am sure 100% ",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  // location = "somewhereelse.html"
                                  //   dispatch(deleteProduct(id))
                                  BadgeUpdater();
                                }
                              })
                            }
                          >
                            {/* <option value="hide">-- Year --</option> */}
                            {badge_list &&
                            badge_list !== undefined &&
                            badge_list.length > 0
                              ? badge_list.map((s) => (
                                  <option value={s} key={s}>
                                    {s}
                                  </option>
                                ))
                              : ""}
                            {/* <option value="2010">2010</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option> */}
                          </select>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {user?.role === "admin_one" ? (
                      <div className="nameUser2">
                        {/* {/* <Link to="/orders" className="LowerBtn" onClick={()=>topload()}>My Orders</Link> */}
                        <button
                          className="LowerBtn"
                          onClick={() => setshow(!show)}
                        >
                          Strike {userer[0]?.name}
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {show === true && user.role === "admin_one" ? (
                  <div className="strikeSection">
                    <h1 className="coloror">Strike {userer[0]?.name}</h1>
                    <input
                      type="text"
                      id="strikeInput"
                      className="strikein"
                      placeholder="Subject of Strike"
                    />
                    <textarea
                      name="description"
                      id="strikeTextArea"
                      className="strikein"
                      cols="60"
                      rows="70"
                      placeholder="Description of Strike"
                    ></textarea>
                    <button
                      className="editProfilebtn shorter"
                      onClick={() => userStriker()}
                    >
                      Strike
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <div className="userStrikes">
                  <h2 className="coloror">{userer[0]?.name} Strikes</h2>
                  {userer[0]?.strikes && userer[0]?.strikes.length > 0
                    ? userer[0]?.strikes.map((s, i) => (
                        <Strikes strike={s} key={i} />
                      )).reverse()
                    : ""}
                </div>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  );
};

export default React.memo(AdminUserBox);
