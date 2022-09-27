import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_RESET,
  PROFILE_UPDATE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  FORGOT_UPDATE_REQUEST,
  FORGOT_UPDATE_SUCCESS,
  FORGOT_UPDATE_FAIL,
  RESET_UPDATE_REQUEST,
  RESET_UPDATE_SUCCESS,
  RESET_UPDATE_FAIL,
  ALL_USER_DATE_REQUEST,
  ALL_USER_DATE_SUCCESS,
  ALL_USER_DATE_FAIL,
  SELLER_USER_DATE_REQUEST,
  SELLER_USER_DATE_SUCCESS,
  SELLER_USER_DATE_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  STRIKE_USER_REQUEST,
  STRIKE_USER_SUCCESS,
  BADGE_USER_REQUEST,
  BADGE_USER_SUCCESS,
  BADGE_USER_FAIL,
  BADGE_USER_RESET,
  STRIKE_USER_FAIL,
  STRIKE_DELETE_REQUEST,
  STRIKE_DELETE_SUCCESS,
  STRIKE_DELETE_FAIL,
  STRIKE_DELETE_RESET,
  CLEAR_ERRORS,
} from "../constants/userConstant";

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    // console.log(data.data.user);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    // console.log(data.user);
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/me`);
    // console.log(data)
    dispatch({ type: LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_UPDATE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PASSWORD_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_UPDATE_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
    dispatch({ type: FORGOT_UPDATE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// RESET Password
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_UPDATE_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      password,
      config
    );
    dispatch({ type: RESET_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: RESET_UPDATE_FAIL, payload: error.response.data.message });
  }
};

// getting users dates that are only be called by the admin_one
export const getAllUsersDates = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_USER_DATE_REQUEST,
    });
    let link = `/api/v1/admin/usersDates`;

    const { data } = await axios.get(link);
    dispatch({
      type: ALL_USER_DATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USER_DATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSellerUsersDates = () => async (dispatch) => {
  try {
    dispatch({
      type: SELLER_USER_DATE_REQUEST,
    });
    let link = `/api/v1/admin/sellerUsersDates`;

    const { data } = await axios.get(link);

    dispatch({
      type: SELLER_USER_DATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_USER_DATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/users/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const strikeUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: STRIKE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/admin/strike/${id}`,
      userData,
      config
    );

    dispatch({ type: STRIKE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: STRIKE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteStrike = (id, strid) => async (dispatch) => {
  try {
    dispatch({ type: STRIKE_DELETE_REQUEST });

    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(
      `/api/v1/admin/deletestrike?id=${id}&strid=${strid}`
      // config
    );

    dispatch({ type: STRIKE_DELETE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: STRIKE_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateUserBadge = (id, rank) => async (dispatch) => {
  try {
    dispatch({ type: BADGE_USER_REQUEST });

    console.log("this is the id",id)
    console.log("this is the rank",rank)

    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/changebadges?id=${id}&rank=${rank}`
      // config
    );

    dispatch({ type: BADGE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: BADGE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
