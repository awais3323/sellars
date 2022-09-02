import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_CATEGORIES_PRODUCT_REQUEST,
  ALL_CATEGORIES_PRODUCT_SUCCESS,
  ALL_CATEGORIES_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  ALL_SELLER_DATES_FAIL,
  ALL_SELLER_DATES_SUCCESS,
  ALL_SELLER_DATES_REQUEST,
} from "../constants/productConstant";

export const getProduct =
  (keyword = "", CurrentPage = 1, price = [0, 200000], rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `/api/v1/product?keyword=${keyword}&page=${CurrentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte] = ${rating}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSellerDates =
  () =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_SELLER_DATES_REQUEST,
      });
      let link = `/api/v1/products/getSellerDates`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_SELLER_DATES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_SELLER_DATES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getProductCategories =
  (keyword = "", CurrentPage = 1, price = [0, 200000], rating = 0, category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_CATEGORIES_PRODUCT_REQUEST,
      });

      let link = `/api/v1/producters?keyword=${keyword}&page=${CurrentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte] = ${rating}`;
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_CATEGORIES_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CATEGORIES_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };



export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// export const getProduct = () => async (dispatch) => {
//     try {
//         dispatch({
//             type:ALL_PRODUCT_REQUEST
//         })
//         const {data} = await axios.get("/api/v1/products")

//         dispatch({
//             type:ALL_PRODUCT_SUCCESS,
//             payload:data,
//         })
//     } catch (error) {
//         dispatch({
//             type:ALL_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         })
//     }
//   };
