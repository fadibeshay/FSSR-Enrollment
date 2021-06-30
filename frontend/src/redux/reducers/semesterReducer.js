import {
  // YEAR_LOADING,
  SEMESTER_LOADING,
  SEMESTER_LOADED,
  SEMESTER_FAIL,
  LOGOUT_SUCCESS,
  SEMESTER_UPDATED
} from "../actions/actionTypes";

const initialState = {
  semester: { semester: { courses: [], acadYear: {} }, current: false },
  message: "",
  isLoading: false,
  success: false,
  search: ""
};

const semesterReducer = (state = initialState, action) => {
  switch (action.type) {
    // case YEAR_LOADING:
    case SEMESTER_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false
      };
    case SEMESTER_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        semester: action.payload.semester,
        search: action.payload.search,
        success: false
      };
    case SEMESTER_UPDATED:
      return {
        ...state,
        isLoading: false,
        message: "",
        semester: {
          ...state.semester,
          semester: { ...state.semester.semester, ...action.payload }
        },
        success: false
      };
    case SEMESTER_FAIL:
      return {
        ...state,
        message: "",
        isLoading: false,
        success: false
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default semesterReducer;
