import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : null
  )
);

export default store;
