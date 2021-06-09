import {
  COURSES_LOADING,
  COURSES_LOADED,
  COURSES_CREATED,
  COURSES_UPDATED,
  COURSES_DELETED,
  COURSES_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  courses: [],
  course: {},
  message: "",
  isLoading: false,
  success: false,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case COURSES_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false,
      };
    case COURSES_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        courses: action.payload,
        success: false,
      };
    case COURSES_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        course: action.payload,
        success: false,
      };
    case COURSES_CREATED:
      return {
        ...state,
        isLoading: false,
        course: action.payload,
        success: true,
      };
    case COURSES_UPDATED:
      return {
        ...state,
        isLoading: false,
        courses: state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        ),
        course: action.payload,
        success: true,
      };
    case COURSES_DELETED:
      return {
        ...state,
        isLoading: false,
        courses: state.courses.filter((s) => s._id !== action.payload),
        course: {},
        success: false,
      };
    case COURSES_FAIL:
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
