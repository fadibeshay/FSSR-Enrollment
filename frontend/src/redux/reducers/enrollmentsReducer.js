import {
  ENROLLMENTS_LOADING,
  ENROLLMENTS_LOADED,
  ENROLLMENTS_STUDENT_LOADED,
  ENROLLMENTS_UPDATED,
  ENROLLMENTS_CREATED,
  ENROLLMENTS_APPROVED,
  ENROLLMENTS_FAIL,
  LOGOUT_SUCCESS,
  ENROLLMENT_COURSE_DELETED,
} from "../actions/actionTypes";

const initialState = {
  enrollments: [],
  enrollment: [],
  message: "",
  isLoading: false,
  success: false,
};

const enrollmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENROLLMENTS_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false,
      };

    case ENROLLMENTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        enrollments: action.payload,
        success: false,
      };

    case ENROLLMENTS_APPROVED:
      return {
        ...state,
        isLoading: false,
        enrollments: state.enrollments.map((enrollment) =>
          enrollment._id === action.payload._id ? action.payload : enrollment
        ),
        enrollment: action.payload,
        success: true,
      };

    case ENROLLMENTS_STUDENT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        enrollment: action.payload,
        success: false,
      };

    // case COURSE_SELECTED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     enrollment: action.payload,
    //     success: true,
    //   };

    case ENROLLMENT_COURSE_DELETED:
      return {
        ...state,
        isLoading: false,
        enrollment: action.payload,
        success: false,
      };

    // case DEPARTMENT_UPDATED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     departments: state.departments.map((department) =>
    //       department._id === action.payload._id ? action.payload : department
    //     ),
    //     department: action.payload,
    //     success: true,
    //   };

    case ENROLLMENTS_FAIL:
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

export default enrollmentsReducer;
