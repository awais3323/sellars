import axios from "axios";
import {
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  ORDER_SELLER_REQUEST,
  ORDER_SELLER_SUCCESS,
  ORDER_SELLER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const getSellerOrders =() =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_ORDER_REQUEST,
      });
      let link = `/api/v1/admin/order/sellerOrders`;

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