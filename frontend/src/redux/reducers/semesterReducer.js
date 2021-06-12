import {
  SEMESTER_LOADING,
  SEMESTERS_LOADED,
  SEMESTER_LOADED,
  SEMESTER_CREATED,
  SEMESTER_UPDATED,
  SEMESTER_DELETED,
  SEMESTER_FAIL,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  semesters: [],
  semester: { courses: [] },
  currentSemester: {},
  message: '',
  isLoading: false,
  success: false
};

const semesterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEMESTER_LOADING:
      return {
        ...state,
        message: '',
        isLoading: true,
        success: false
      };
    case SEMESTERS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: '',
        semesters: action.payload,
        success: false
      };
    case SEMESTER_LOADED:
      return {
        ...state,
        isLoading: false,
        message: '',
        semester: action.payload,
        success: false
      };
    case SEMESTER_CREATED:
      return {
        ...state,
        isLoading: false,
        semester: action.payload,
        success: true
      };
    case SEMESTER_UPDATED:
      return {
        ...state,
        isLoading: false,
        semesters: state.semesters.map((semester) =>
          semester._id === action.payload._id ? action.payload : semester
        ),
        semester: action.payload,
        success: true
      };
    case SEMESTER_DELETED:
      return {
        ...state,
        isLoading: false,
        semesters: state.semesters.filter((s) => s._id !== action.payload),
        semester: {},
        success: false
      };
    case SEMESTER_FAIL:
      return {
        ...state,
        message: '',
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
