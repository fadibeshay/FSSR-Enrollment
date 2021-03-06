import {
  DEPARTMENT_LOADING,
  DEPARTMENTS_LOADED,
  DEPARTMENT_LOADED,
  DEPARTMENT_CREATED,
  DEPARTMENT_UPDATED,
  DEPARTMENT_UPDATED_CLEAR,
  DEPARTMENT_DELETED,
  DEPARTMENT_FAIL,
  LOGOUT_SUCCESS,
  DEPARTMENT_SUBJECT_ADDED,
  DEPARTMENT_SUBJECT_DELETED
} from "../actions/actionTypes";

const initialState = {
  departments: [],
  department: {},
  message: "",
  isLoading: false,
  success: false,
  search: ""
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEPARTMENT_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false
      };
    case DEPARTMENTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        departments: action.payload.departments,
        search: action.payload.search,
        success: false
      };
    case DEPARTMENT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        department: action.payload,
        success: false
      };
    case DEPARTMENT_CREATED:
      return {
        ...state,
        isLoading: false,
        departments: [...state.departments, action.payload],
        department: action.payload,
        success: true
      };
    case DEPARTMENT_UPDATED:
      return {
        ...state,
        isLoading: false,
        departments: state.departments.map((d) =>
          d._id === action.payload._id ? action.payload : d
        ),
        department: action.payload,
        success: true
      };

    case DEPARTMENT_UPDATED_CLEAR:
      return {
        ...state,
        success: false
      };

    case DEPARTMENT_DELETED:
      return {
        ...state,
        isLoading: false,
        departments: state.departments.filter((s) => s._id !== action.payload),
        success: false
      };

    case DEPARTMENT_SUBJECT_ADDED:
      return {
        ...state,
        isLoading: false,
        department: {
          ...state.department,
          subjects: [...state.department.subjects, action.payload]
        },
        success: true
      };

    case DEPARTMENT_SUBJECT_DELETED:
      return {
        ...state,
        isLoading: false,
        department: {
          ...state.department,
          subjects: state.department.subjects.filter(
            (s) => s.subject._id !== action.payload
          )
        },
        success: false
      };

    case DEPARTMENT_FAIL:
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

export default departmentReducer;
