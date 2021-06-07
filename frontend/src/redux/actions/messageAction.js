import { GET_MESSAGES, CLEAR_MESSAGES } from "./actionTypes";

export const getMessage = (message) => {
  return {
    type: GET_MESSAGES,
    payload: message,
  };
};

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
