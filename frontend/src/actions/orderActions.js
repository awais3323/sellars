import axios from "axios";
import {
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  ORDER_SELLER_REQUEST,
  ORDER_SELLER_SUCCESS,
  ORDER_SELLER_FAIL,
  ORDER_USER_REQUEST,
  ORDER_USER_SUCCESS,
  ORDER_USER_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const getSellerOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_SELLER_REQUEST,
    });
    let link = `/api/v1/admin/order/sellerOrders`;

    const { data } = await axios.get(link);

    dispatch({
      type: ORDER_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_SELLER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_USER_REQUEST,
    });
    let link = `/api/v1/order/allone`;

    const { data } = await axios.get(link);

    dispatch({
      type: ORDER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getallOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ORDER_REQUEST,
    });
    let link = `/api/v1/admin/order/all`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_UPDATE_REQUEST,
    });
    let link = `/api/v1/admin/order?id=${id}&status=${status}`;

    const { data } = await axios.put(link);

    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
