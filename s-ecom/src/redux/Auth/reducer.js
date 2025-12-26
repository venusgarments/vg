import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  LOGOUT,
  CLEAR_AUTH_ERROR,
} from "./ActionTypes";

const initialState = {
  user: null,
  userList: [],
  isLoading: false,
  error: null,
  openModal: false, // Added modal state
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        openModal: false, // Close modal on success
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userList: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        user: null,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };

    case "OPEN_LOGIN_MODAL":
      return { ...state, openModal: true };

    case "CLOSE_LOGIN_MODAL":
      return { ...state, openModal: false };

    default:
      return state;
  }
};

export default authReducer;
