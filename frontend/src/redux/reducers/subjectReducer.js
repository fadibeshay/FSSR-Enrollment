import {
  SUBJECT_LOADING,
  SUBJECTS_LOADED,
  SUBJECT_LOADED,
  SUBJECT_FAIL,
  SUBJECT_CREATED,
  SUBJECT_UPDATED,
  SUBJECT_DELETED,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  subjects: [],
  subject: {},
  message: '',
  isLoading: false
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBJECT_LOADING:
      return {
        ...state,
        message: '',
        isLoading: true
      };
    case SUBJECTS_LOADED:
      return {
        ...state,
        isLoading: false,
        message: '',
        subjects: action.payload
      };
    case SUBJECT_LOADED:
      return {
        ...state,
        isLoading: false,
        message: '',
        subject: action.payload
      };
    case SUBJECT_CREATED:
      return {
        ...state,
        isLoading: false,
        subject: action.payload,
        message: 'Subject created successfully'
      };
    case SUBJECT_UPDATED:
      return {
        ...state,
        isLoading: false,
        subjects: state.subjects.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
        subject: action.payload,
        message: 'Subject updated successfully'
      };
    case SUBJECT_DELETED:
      return {
        ...state,
        isLoading: false,
        subjects: state.subjects.filter((s) => s._id !== action.payload),
        subject: {},
        message: 'Subject deleted successfully'
      };
    case SUBJECT_FAIL:
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

export default subjectReducer;
