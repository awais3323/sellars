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
  CLEAR_ERRORS,
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
      case LOAD_FAIL:{
        return{
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        }
      }
      case LOGOUT_SUCCESS:{
        return{
          loading: false,
          isAuthenticated: false,
          user: null,
        }
      }
      case LOGOUT_FAIL:{
        return{
          ...state,
          loading: false,
          error: action.payload,
        }
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

export const profileupdaterReducer= (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_UPDATE_SUCCESS:
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case PROFILE_UPDATE_RESET:
    case PASSWORD_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case PROFILE_UPDATE_FAIL:
    case PASSWORD_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
  
};

export const forgotPasswordReducer= (state = {}, action) => {
  switch (action.type) {
    case FORGOT_UPDATE_REQUEST:
      case RESET_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error:null,
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