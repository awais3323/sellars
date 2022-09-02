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

    const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

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

    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      email,
      config
    );
    dispatch({ type: FORGOT_UPDATE_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error.response.data)
    dispatch({ type: FORGOT_UPDATE_FAIL, payload: error.response.data.message });
  }
};

// RESET Password
export const resetPassword = (token,password) => async (dispatch) => {
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
    console.log(error.response.data)
    dispatch({ type: RESET_UPDATE_FAIL, payload: error.response.data.message });
  }
};

// getting users dates that are only be called by the admin_one
export const getAllUsersDates =
  () =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_USER_DATE_REQUEST,
      });
      let link = `/api/v1/admin/usersDates`;

      const { data } = await axios.get(link);
      console.log(data)
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

export const getSellerUsersDates =
  () =>
  async (dispatch) => {
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


//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
