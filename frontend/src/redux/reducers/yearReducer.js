import {
  YEAR_LOADING,
  YEARS_LOADED,
  YEAR_LOADED,
  YEAR_CREATED,
  YEAR_UPDATED,
  YEAR_UPDATED_CLEAR,
  YEAR_DELETED,
  YEAR_FAIL,
  LOGOUT_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  years: { acadYears: [] },
  year: { semesters: [], current: false },
  message: "",
  isLoading: false,
  success: false,
  search: ""
};

const yearReducer = (state = initialState, action) => {
  switch (action.type) {
    case YEAR_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false
      };
    case YEARS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        years: action.payload.years,
        search: action.payload.search,
        success: false
      };
    case YEAR_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        year: action.payload,
        success: false
      };

    case YEAR_CREATED:
      return {
        ...state,
        isLoading: false,
        years: {
          ...state.years,
          acadYears: [action.payload, ...state.years.acadYears]
        },
        year: action.payload,
        message: "Year created successfully",
        success: true
      };
    case YEAR_UPDATED:
      return {
        ...state,
        isLoading: false,
        year: action.payload,
        years: {
          ...state.years,
          acadYears: state.years.acadYears.map((y) =>
            y._id !== action.payload._id ? y : action.payload
          )
        },
        message: "Year updated successfully",
        success: true
      };
    case YEAR_UPDATED_CLEAR:
      return {
        ...state,
        success: false
      };
    case YEAR_DELETED:
      return {
        ...state,
        isLoading: false,
        years: {
          ...state.years,
          acadYears: state.years.acadYears.filter(
            (y) => y._id !== action.payload
          )
        },
        message: "Year deleted successfully",
        success: true
      };
    case YEAR_FAIL:
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

export default yearReducer;
