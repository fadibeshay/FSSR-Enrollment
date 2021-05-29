import axios from 'axios';
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FALL,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  CLEAR_ERRORS
} from './actionTypes';
import { getErrors, clearErrors } from './errorsAction';

// LoadUser

// LOGIN
export const LoginUser =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      Headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }
    };

    axios
      .post('/api/users/login', { email, password }, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch((err) => {
        // console.log("err :>> ", err.message);
        dispatch({ type: GET_ERRORS, payload: err.message });
        dispatch({ type: LOGIN_FALL });
      });
  };

// LOGOUT

// Send With Token
export const headerConfig = (getState) => {
  const token = getState().user.token;
  // Header Config
  const config = {
    Headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  };
  if (token) {
    config.header['x-auth-token'] = token;
  }

  return config;
};
