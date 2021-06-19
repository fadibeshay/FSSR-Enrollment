import {
  STUDENT_LOADING,
  STUDENTS_LOADED,
  STUDENT_LOADED,
  STUDENT_FAIL,
  STUDENT_CREATED,
  STUDENT_UPDATED,
  STUDENT_DELETED,
  LOGOUT_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  students: [],
  student: {},
  message: "",
  isLoading: false,
  success: false
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false
      };
    case STUDENTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        students: action.payload,
        success: false
      };
    case STUDENT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        student: action.payload,
        success: false
      };
    case STUDENT_CREATED:
      return {
        ...state,
        isLoading: false,
        student: action.payload,
        message: "Student created successfully",
        success: true
      };
    case STUDENT_UPDATED:
      // console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        students:
          state.students.length > 0
            ? state.students.map((student) =>
                student._id === action.payload._id ? action.payload : student
              )
            : state.students,
        student: action.payload,
        message: "Student updated successfully",
        success: true
      };
    case STUDENT_DELETED:
      return {
        ...state,
        isLoading: false,
        students: state.students.filter((s) => s._id !== action.payload),
        student: {},
        message: "Student deleted successfully",
        success: false
      };
    case STUDENT_FAIL:
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

export default studentReducer;
