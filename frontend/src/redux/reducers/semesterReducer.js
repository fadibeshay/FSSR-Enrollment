import {
  SEMESTER_LOADING,
  SEMESTER_LOADED,
  SEMESTER_FAIL,
  LOGOUT_SUCCESS,
  SEMESTER_UPDATED,
  COURSE_CREATED,
  COURSE_UPDATED,
  COURSE_UPDATED_CLEAR,
  COURSE_DELETED,
  COURSE_LOADING,
  COURSE_LOADED,
  COURSE_FAIL
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
    case SEMESTER_LOADING:
    case COURSE_LOADING:
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
    case COURSE_FAIL:
      return {
        ...state,
        message: "",
        isLoading: false,
        success: false
      };

    case COURSE_LOADED:
      return {
        ...state,
        isLoading: false,
        success: false,
        message: ""
      };
    case COURSE_CREATED:
      return {
        ...state,
        isLoading: false,
        semester: {
          ...state.semester,
          semester: {
            ...state.semester.semester,
            courses: [action.payload, ...state.semester.semester.courses]
          }
        },
        success: true
      };
    case COURSE_UPDATED:
      return {
        ...state,
        isLoading: false,
        semester: {
          ...state.semester,
          semester: {
            ...state.semester.semester,
            courses: state.semester.semester.courses.map((c) =>
              c._id !== action.payload._id ? c : action.payload
            )
          }
        },
        success: true
      };
    case COURSE_UPDATED_CLEAR:
      return {
        ...state,
        success: false
      };
    case COURSE_DELETED:
      return {
        ...state,
        isLoading: false,
        semester: {
          ...state.semester,
          semester: {
            ...state.semester.semester,
            courses: state.semester.semester.courses.filter(
              (c) => c._id !== action.payload
            )
          }
        },
        success: false
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default semesterReducer;
