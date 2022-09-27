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
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,

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

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/products/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const updateProduct = (productData,id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
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
