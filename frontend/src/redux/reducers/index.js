import { combineReducers } from 'redux';
import userReducer from './userReducer';
import studentReducer from './studentReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  user: userReducer,
  student: studentReducer,
  errors: errorsReducer
});
