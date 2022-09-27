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
  PASSWORD_UPDATE_RESET,
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
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  CLEAR_ERRORS,
  STRIKE_USER_REQUEST,
  STRIKE_USER_SUCCESS,
  STRIKE_USER_FAIL,
  STRIKE_USER_RESET,
  STRIKE_DELETE_REQUEST,
  STRIKE_DELETE_SUCCESS,
  STRIKE_DELETE_FAIL,
  STRIKE_DELETE_RESET,
  BADGE_USER_REQUEST,
  BADGE_USER_SUCCESS,
  BADGE_USER_FAIL,
  BADGE_USER_RESET,
} from "../constants/userConstant";

export const useReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_FAIL: {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const profileupdaterReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
    case PASSWORD_UPDATE_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_UPDATE_SUCCESS:
    case PASSWORD_UPDATE_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case PROFILE_UPDATE_RESET:
    case PASSWORD_UPDATE_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case PROFILE_UPDATE_FAIL:
    case PASSWORD_UPDATE_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const SellerUsersDates = (state = { SEUSDAT: [] }, action) => {
  switch (action.type) {
    case SELLER_USER_DATE_REQUEST:
      return {
        sellProdDates: [],
      };

    case SELLER_USER_DATE_SUCCESS:
      return {
        sellProdDates: action.payload.real_UserSellerDatArr,
        sellusers: action.payload.usersSeller,
      };

    case SELLER_USER_DATE_FAIL:
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
export const AllUsersDates = (state = { ALUSDAT: [] }, action) => {
  switch (action.type) {
    case ALL_USER_DATE_REQUEST:
      return {
        sellProdDates: [],
      };

    case ALL_USER_DATE_SUCCESS:
      return {
        sellProdDates: action.payload.real_UserAllrDatArr,
        Allusers: action.payload.Allusers,
      };

    case ALL_USER_DATE_FAIL:
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_UPDATE_REQUEST:
    case RESET_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case RESET_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case FORGOT_UPDATE_FAIL:
    case RESET_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const strikeReducer = (state = { striked: [] }, action) => {
  switch (action.type) {
    case STRIKE_USER_REQUEST:
    case STRIKE_DELETE_REQUEST:
      return {
        ...state,
        loadstr: true,
        error: null,
      };
    case STRIKE_USER_SUCCESS:
    case STRIKE_DELETE_SUCCESS:
      return {
        ...state,
        loadstr: false,
        isStriked: action.payload,
      };
    case STRIKE_USER_FAIL:
    case STRIKE_DELETE_FAIL:
      return {
        ...state,
        loadstr: false,
        error: action.payload,
      };
    case STRIKE_USER_RESET:
    case STRIKE_DELETE_RESET:
      return {
        ...state,
        loadstr: false,
        isStriked: false,
      };

    default:
      return state;
  }
};

export const BadgeReducer = (state = { badge: [] }, action) => {
  switch (action.type) {
    case BADGE_USER_REQUEST:
      return {
        ...state,
        lodbad :true,
        error: null,
      };
    case BADGE_USER_SUCCESS:
      return {
        ...state,
        lodbad :false,
        userBadged: action.payload,
      };
      case BADGE_USER_FAIL:
      return {
        ...state,
        loadbad: false,
        error: action.payload,
      };
    case BADGE_USER_RESET:
      return {
        ...state,
        lodbad: false,
        userBadged: false,
      };

    default:
      return state;
  }
};
