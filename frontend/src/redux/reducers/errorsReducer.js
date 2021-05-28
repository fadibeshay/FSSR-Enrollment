import { GET_ERRORS, CLEAR_ERRORS } from "../actions/actionTypes";

const initialState = {
  message: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        message: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        message: "",
      };
    default:
      return state;
  }
}
