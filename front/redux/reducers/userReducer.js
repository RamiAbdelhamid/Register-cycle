import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";

const initialState = {
  user: null,
  loading: true,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
