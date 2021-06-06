import { combineReducers } from "redux";
import userReducer from "./userReducer";
import studentReducer from "./studentReducer";
import subjectReducer from "./subjectReducer";
import departmentReducer from "./departmentReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  user: userReducer,
  student: studentReducer,
  subject: subjectReducer,
  department: departmentReducer,
  errors: errorsReducer,
});
