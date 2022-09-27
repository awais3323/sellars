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

export const sellerorderReducer = (state = { ordersSells: [] }, action) => {
  switch (action.type) {
    case ORDER_SELLER_REQUEST:
    case ORDER_USER_REQUEST:
      return {
        //   loading: true,
        ORDERs: [],
      };

    case ORDER_SELLER_SUCCESS:
      return {
        //   loading: false,
        orders: action.payload.order,
        totalOrders: action.payload.totalOrders,
        OrderDates: action.payload.real_ordDatArr,
      };
    case ORDER_USER_SUCCESS:
      return {
        orders: action.payload.order,
        totalOrders: action.payload.totalAmount,
      };

    case ORDER_SELLER_FAIL:
    case ORDER_USER_FAIL:
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

export const allorderReducer = (state = { ordersSells: [] }, action) => {
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

export const updateOrder = (state = { upOrder: [] }, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return {
          loading: true,
        // loading:false
      };

    case ORDER_UPDATE_SUCCESS:
      return {
          loading: false,
        success: action.payload.success,
      };

    case ORDER_UPDATE_FAIL:
      return {
          loading: false,
        error: action.payload.message,
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
