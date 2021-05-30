import { GET_ERRORS, CLEAR_ERRORS } from './actionTypes';

export const getErrors = (err) => {
  return {
    type: GET_ERRORS,
    payload:
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
