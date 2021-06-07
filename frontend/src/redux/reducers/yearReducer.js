import {
  YEAR_LOADING,
  YEARS_LOADED,
  YEAR_LOADED,
  YEAR_CREATED,
  YEAR_UPDATED,
  YEAR_DELETED,
  YEAR_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  years: [],
  year: {},
  message: "",
  isLoading: false,
};

const yearReducer = (state = initialState, action) => {
  switch (action.type) {
    case YEAR_LOADING:
      return {
        ...state,
        year: {},
        message: "",
        isLoading: true,
      };
    case YEARS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        years: action.payload,
      };
    case YEAR_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        year: action.payload,
      };
    case YEAR_CREATED:
      return {
        ...state,
        isLoading: false,
        year: action.payload,
        message: "Year created successfully",
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
      };
    case YEAR_DELETED:
      return {
        ...state,
        isLoading: false,
        years: state.years.filter((s) => s._id !== action.payload),
        year: {},
        message: "Year deleted successfully",
      };
    case YEAR_FAIL:
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

export default yearReducer;
