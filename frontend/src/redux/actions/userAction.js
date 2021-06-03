import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  USER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FALL,
  LOGOUT_SUCCESS,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";

// LoadUser
export const LoadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  axios
    .get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch(clearErrors());

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .then((err) => {
      if (err !== undefined) {
        dispatch(getErrors(err));
      }
    });
};

// LOGIN
export const LoginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      const config = {
        Headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: LOGIN_FALL });
    }
  };

// LOGOUT
export const LogoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// Send With Token
export const headerConfig = () => {
  const token = localStorage.getItem("token");

  // Header Config
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
