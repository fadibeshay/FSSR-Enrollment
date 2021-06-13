import {
  YEAR_LOADING,
  YEARS_LOADED,
  YEAR_LOADED,
  YEAR_CREATED,
  YEAR_UPDATED,
  YEAR_DELETED,
  YEAR_FAIL,
  YEAR_SEMESTERS_LOADING,
  YEAR_SEMESTERS_LOADED,
  LOGOUT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  years: [],
  year: { semesters: [] },
  message: "",
  isLoading: false,
  success: false,
  yearsSemesters: [],
};

const yearReducer = (state = initialState, action) => {
  switch (action.type) {
    case YEAR_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false,
      };
    case YEARS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        years: action.payload,
        success: false,
      };
    case YEAR_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        year: action.payload,
        success: false,
      };

    case YEAR_CREATED:
      return {
        ...state,
        isLoading: false,
        year: action.payload,
        message: "Year created successfully",
        success: true,
      };
    case YEAR_UPDATED:
      return {
        ...state,
        isLoading: false,
        years: state.years.map((year) =>
          year._id === action.payload._id ? action.payload : year
        ),
        year: action.payload,
        message: "Year updated successfully",
        success: true,
      };
    case YEAR_DELETED:
      return {
        ...state,
        isLoading: false,
        years: state.years.filter((s) => s._id !== action.payload),
        year: {},
        message: "Year deleted successfully",
        success: true,
      };
    case YEAR_FAIL:
      return {
        ...state,
        message: "",
        isLoading: false,
        success: false,
      };
    case LOGOUT_SUCCESS:
      return initialState;

    case YEAR_SEMESTERS_LOADING:
      return {
        ...state,
        isLoading: false,
        success: false,
      };
    case YEAR_SEMESTERS_LOADED:
      return {
        ...state,
        isLoading: false,
        yearsSemesters: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export default yearReducer;
