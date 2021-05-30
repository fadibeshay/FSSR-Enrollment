import {
  STUDENT_LOADING,
  STUDENTS_LOADED,
  STUDENT_LOADED,
  STUDENT_FAIL,
  STUDENT_CREATED,
  STUDENT_UPDATED,
  STUDENT_DELETED,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  students: [],
  student: {},
  message: '',
  isLoading: false
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        message: '',
        isLoading: true
      };
    case STUDENTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: '',
        students: action.payload
      };
    case STUDENT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: '',
        student: action.payload
      };
    case STUDENT_CREATED:
      return {
        ...state,
        isLoading: false,
        student: action.payload,
        message: 'Student created successfully'
      };
    case STUDENT_UPDATED:
      return {
        ...state,
        isLoading: false,
        student: action.payload,
        message: 'Student updated successfully'
      };
    case STUDENT_DELETED:
      return {
        ...state,
        isLoading: false,
        students: state.students.filter((s) => s._id !== action.payload),
        student: {},
        message: 'Student deleted successfully'
      };
    case STUDENT_FAIL:
      return {
        ...state,
        message: '',
        isLoading: false
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default studentReducer;
