import {
  SUBJECT_LOADING,
  SUBJECTS_LOADED,
  SUBJECT_LOADED,
  SUBJECT_FAIL,
  SUBJECT_CREATED,
  SUBJECT_UPDATED,
  SUBJECT_UPDATED_CLEAR,
  SUBJECT_DELETED,
  LOGOUT_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  subjects: { subjects: [] },
  subject: {},
  search: "",
  message: "",
  isLoading: false,
  success: false
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBJECT_LOADING:
      return {
        ...state,
        message: "",
        isLoading: true,
        success: false
      };
    case SUBJECTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        subjects: action.payload.subjects,
        search: action.payload.search,
        success: false
      };
    case SUBJECT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: "",
        subject: action.payload,
        success: false
      };
    case SUBJECT_CREATED:
      return {
        ...state,
        isLoading: false,
        subjects: {
          ...state.subjects,
          subjects: [action.payload, ...state.subjects.subjects]
        },
        subject: action.payload,
        message: "Subject created successfully",
        success: true
      };
    case SUBJECT_UPDATED:
      return {
        ...state,
        isLoading: false,
        subjects: {
          ...state.subjects,
          subjects: state.subjects.subjects.map((s) =>
            s._id !== action.payload._id ? s : action.payload
          )
        },
        subject: action.payload,
        message: "Subject updated successfully",
        success: true
      };
    case SUBJECT_UPDATED_CLEAR:
      return {
        ...state,
        success: false
      };
    case SUBJECT_DELETED:
      return {
        ...state,
        isLoading: false,
        subjects: {
          ...state.subjects,
          subjects: state.subjects.subjects.filter(
            (s) => s._id !== action.payload
          )
        },
        message: "Subject deleted successfully",
        success: true
      };
    case SUBJECT_FAIL:
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

export default subjectReducer;
