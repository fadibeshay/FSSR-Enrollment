import { GET_ERRORS, CLEAR_ERRORS } from "./actionTypes";

export const getErrors = (message) => {
  return {
    type: GET_ERRORS,
    payload: { message },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
