import axios from "axios";
import {
  SEMESTER_LOADING,
  SEMESTERS_LOADED,
  SEMESTER_LOADED,
  SEMESTER_CREATED,
  SEMESTER_UPDATED,
  SEMESTER_DELETED,
  SEMESTER_FAIL,
  SEMESTERS_COURSES_LOADING,
  SEMESTERS_COURSES_LOADED,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";
import { getMessage, clearMessage } from "./messageAction";
import { headerConfig } from "./userAction";

// Load SEMESTERs
export const LoadSemesters =
  (name = "", nid = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SEMESTER_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.get(
        `/api/semesters?name=${name}&nid=${nid}`,
        config
      );

      dispatch({
        type: SEMESTERS_LOADED,
        payload: data,
      });

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: SEMESTER_FAIL });
    }
  };

// Load SEMESTER by id
export const LoadSemester = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEMESTER_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.get(`/api/semesters/${_id}`, config);

    dispatch({
      type: SEMESTER_LOADED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: SEMESTER_FAIL });
  }
};

// Load Courses by Semester ID
export const SemestersCourses = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: SEMESTERS_COURSES_LOADING,
    });

    const config = headerConfig();
    const { data } = await axios.get(`/api/semesters/${_id}`, config);

    dispatch({
      type: SEMESTERS_COURSES_LOADED,
      payload: data,
    });
    dispatch({
      type: SEMESTERS_COURSES_LOADING,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: SEMESTER_FAIL });
  }
};

// Create SEMESTER
export const CreateSemester = (semester) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEMESTER_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.post("/api/semesters", semester, config);

    dispatch({
      type: SEMESTER_CREATED,
      payload: data,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Semester created successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));
    dispatch({ type: SEMESTER_FAIL });
  }
};

// Update Semester
export const UpdateSemester = (semester, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEMESTER_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.put(`/api/semesters/${id}`, semester, config);

    dispatch({
      type: SEMESTER_UPDATED,
      payload: data,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Semester updated successfully"));
  } catch (err) {
    dispatch(clearMessage());

    dispatch(getErrors(err));
    dispatch({ type: SEMESTER_FAIL });
  }
};

// Delete Semester
export const DeleteSemester = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEMESTER_LOADING,
    });

    const config = headerConfig(getState);

    await axios.delete(`/api/semesters/${_id}`, config);

    dispatch({
      type: SEMESTER_DELETED,
      payload: _id,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Semester deleted successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));

    dispatch({ type: SEMESTER_FAIL });
  }
};
