import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, ERROR_RESET } from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };
    case ERROR_RESET:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
