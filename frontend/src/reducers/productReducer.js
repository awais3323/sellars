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
  SET_DARK_MODE,
  CLEAR_ERRORS,
  ALL_SELLER_DATES_FAIL,
  ALL_SELLER_DATES_SUCCESS,
  ALL_SELLER_DATES_REQUEST,
} from "../constants/productConstant";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductCount: action.payload.filteredProductCount,
        // productDates: action.payload.real_prodDatArr,
      };

    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
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
export const sellerProductDates = (state = { productsDates: [] }, action) => {
  switch (action.type) {
    case ALL_SELLER_DATES_REQUEST:
      return {
        sellProdDates: [],
      };

    case ALL_SELLER_DATES_SUCCESS:
      return {
        sellProdDates: action.payload.real_ordDatArr,
        // productDates: action.payload.real_prodDatArr,
      };

    case ALL_SELLER_DATES_FAIL:
      return {
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
export const CategoriesProdReducer = (
  state = { pageProoductCategory: [] },
  action
) => {
  switch (action.type) {
    case ALL_CATEGORIES_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_CATEGORIES_PRODUCT_SUCCESS:
      return {
        loading: false,
        producter: action.payload.producter,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductCount: action.payload.filteredProductCount,
      };

    case ALL_CATEGORIES_PRODUCT_FAIL:
      return {
        loading: false,
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



export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
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
