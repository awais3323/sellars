import { SET_DARK_MODE,TOP_LOADING_BAR_MOVEMENT,PRODUCT_CATEGORY, CLEAR_ERRORS } from "../constants/otherConstant";

export const darkModeSetter = (state = { Mode: [] }, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        modes: action.payload,
      };

    default:
      return state;
  }
};

export const topLoadingBarReducer = (state = { progressive: [] }, action) => {
  switch (action.type) {
    case TOP_LOADING_BAR_MOVEMENT:
      return {
        progressive: action.payload,
      };

    default:
      return state;
  }
};

export const productCat = (state = { prodi: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY:
      return {
        prodi: action.payload,
      };

    default:
      return state;
  }
};
