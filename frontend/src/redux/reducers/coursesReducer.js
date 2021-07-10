import {
  COURSE_LOADING,
  COURSE_LOADED,
  COURSE_FAIL,
  LOGOUT_SUCCESS,
  ADD_STUDENT_GRADE,
} from "../actions/actionTypes";

const initialState = {
  course: {},
  message: "",
  isLoading: false,
  success: false,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false,
      };
    case COURSE_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        course: action.payload,
        success: false,
      };

    case ADD_STUDENT_GRADE:
      return {
        ...state,
        course: action.payload,
        message: "",
        isLoading: false,
        success: false,
      };
    case COURSE_FAIL:
      return {
        ...state,
        message: "",
        isLoading: false,
        success: false,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default courseReducer;
