
import {
    SET_DARK_MODE,
    TOP_LOADING_BAR_MOVEMENT,
    PRODUCT_CATEGORY,
    CLEAR_ERRORS
  } from "../constants/otherConstant";

  
  export const setDarkMode = (moder) => async (dispatch) => {
    if (moder === undefined) {
      if (localStorage.getItem("moding") !== null) {
        moder = JSON.parse(localStorage.getItem("moding"));
      } else {
        moder = false;
      }
    }
    let data = moder;
    dispatch({
      type: SET_DARK_MODE,
      payload: data,
    });
  };

  export const topLoadingBar = () => async (dispatch) => {
    let progressive = 30;
    setTimeout(() => {
      progressive = 60;
      dispatch({
        type: TOP_LOADING_BAR_MOVEMENT,
        payload: progressive,
      });
    }, 1000);

  };
  export const productCategory =(prodCat) => async (dispatch) => {
    let data = prodCat;
    dispatch({
      type: PRODUCT_CATEGORY,
      payload: data,
    });
  };

  

  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  