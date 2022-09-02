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

export const orderReducer = (state = { ordersSells: [] }, action) => {
    switch (action.type) {
      case ALL_ORDER_REQUEST:
        return {
        //   loading: true,
          ORDERs: [],
        };
  
      case ALL_ORDER_SUCCESS:
        return {
        //   loading: false,
          orders: action.payload.order,
          totalOrders: action.payload.totalOrders,
          OrderDates: action.payload.real_ordDatArr,
        };
  
      case ALL_ORDER_FAIL:
        return {
        //   loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };