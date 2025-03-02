import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";
import Cookies from "js-cookie"; // Import js-cookie

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/login", { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });
    Cookies.set("token", res.data.token, { expires: 7 }); // Store the token in a cookie, expires in 7 days
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response ? err.response.data.message : "Server error",
    });
  }
};

export const logoutUser = () => (dispatch) => {
  Cookies.remove("token"); // Remove the token from cookies
  dispatch({ type: LOGOUT }); // Dispatch logout action to update the state
};
