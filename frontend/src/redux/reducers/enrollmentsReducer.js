import {
  ENROLLMENT_COURSE_ADDED,
  ENROLLMENT_APPROVED,
  ENROLLMENTS_FAIL,
  ENROLLMENTS_LOADED,
  ENROLLMENTS_LOADING,
  ENROLLMENT_STUDENT_LOADED,
  ENROLLMENT_COURSE_DELETED,
  LOGOUT_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  enrollments: { enrols: [] },
  enrollment: {},
  search: "",
  message: "",
  isLoading: false,
  success: false
};

const enrollmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENROLLMENTS_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false
      };

    case ENROLLMENTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        enrollments: action.payload.enrols,
        search: action.payload.search,
        success: false
      };

    case ENROLLMENT_APPROVED:
      return {
        ...state,
        isLoading: false,
        enrollments: {
          ...state.enrollments,
          enrols: state.enrollments.enrols.map((e) =>
            e._id === action.payload._id ? action.payload : e
          )
        },
        enrollment:
          state.enrollment._id === action.payload._id
            ? action.payload
            : state.enrollment,
        success: true
      };

    case ENROLLMENT_COURSE_ADDED:
      return {
        ...state,
        isLoading: false,
        message: "",
        enrollment: action.payload,
        success: false
      };

    case ENROLLMENT_COURSE_DELETED:
      return {
        ...state,
        isLoading: false,
        enrollment: action.payload,
        success: false
      };

    case ENROLLMENT_STUDENT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        enrollment: action.payload,
        success: false
      };

    case ENROLLMENTS_FAIL:
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

export default enrollmentsReducer;
