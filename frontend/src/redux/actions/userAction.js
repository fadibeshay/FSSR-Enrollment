import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FALL,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  CLEAR_ERRORS,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";

// LoadUser

// LOGIN
export const LoginUser =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };

    axios
      .post("/api/users/login", { email, password }, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
        dispatch({ type: LOGIN_FALL });
      });
  };

// LOGOUT
export const LogoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// Send With Token
export const headerConfig = (getState) => {
  const token = getState().user.token;
  // Header Config
  const config = {
    Headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    // config.header["x-auth-token"] = token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
