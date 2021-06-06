import {
  DEPARTMENT_LOADING,
  DEPARTMENTS_LOADED,
  DEPARTMENT_LOADED,
  DEPARTMENT_CREATED,
  DEPARTMENT_UPDATED,
  DEPARTMENT_DELETED,
  DEPARTMENT_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  departments: [],
  department: {},
  message: "",
  isLoading: false,
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEPARTMENT_LOADING:
      return {
        ...state,
        department: {},
        message: "",
        isLoading: true,
      };
    case DEPARTMENTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        departments: action.payload,
      };
    case DEPARTMENT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        department: action.payload,
      };
    case DEPARTMENT_CREATED:
      return {
        ...state,
        isLoading: false,
        department: action.payload,
        message: "Department created successfully",
      };
    case DEPARTMENT_UPDATED:
      return {
        ...state,
        isLoading: false,
        departments: state.departments.map((department) =>
          department._id === action.payload._id ? action.payload : department
        ),
        department: action.payload,
        message: "Department updated successfully",
      };
    case DEPARTMENT_DELETED:
      return {
        ...state,
        isLoading: false,
        departments: state.departments.filter((s) => s._id !== action.payload),
        department: {},
        message: "Department deleted successfully",
      };
    case DEPARTMENT_FAIL:
      return {
        ...state,
        message: "",
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default departmentReducer;
