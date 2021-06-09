import axios from "axios";
import {
  COURSES_LOADING,
  COURSES_LOADED,
  COURSES_CREATED,
  COURSES_UPDATED,
  COURSES_DELETED,
  COURSES_FAIL,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";
import { getMessage, clearMessage } from "./messageAction";
import { headerConfig } from "./userAction";

// Load COURSESs
export const LoadCourses =
  (name = "", nid = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSES_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.get(
        `/api/courses?name=${name}&nid=${nid}`,
        config
      );

      dispatch({
        type: COURSES_LOADED,
        payload: data,
      });

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: COURSES_FAIL });
    }
  };

// Load COURSES by id
export const LoadCourse = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSES_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.get(`/api/courses/${_id}`, config);

    dispatch({
      type: COURSES_LOADED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: COURSES_FAIL });
  }
};

// Create COURSES
export const CreateCourses = (department) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSES_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.post("/api/courses", department, config);

    dispatch({
      type: COURSES_CREATED,
      payload: data,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Courses created successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));
    dispatch({ type: COURSES_FAIL });
  }
};

// Update Courses
export const UpdateCourses = (department, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSES_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.put(`/api/courses/${id}`, department, config);

    dispatch({
      type: COURSES_UPDATED,
      payload: data,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Courses updated successfully"));
  } catch (err) {
    dispatch(clearMessage());

    dispatch(getErrors(err));
    dispatch({ type: COURSES_FAIL });
  }
};

// Delete Courses
export const DeleteCourses = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSES_LOADING,
    });

    const config = headerConfig(getState);

    await axios.delete(`/api/courses/${_id}`, config);

    dispatch({
      type: COURSES_DELETED,
      payload: _id,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Courses deleted successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));

    dispatch({ type: COURSES_FAIL });
  }
};
