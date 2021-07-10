import axios from "axios";
import {
  COURSE_LOADING,
  COURSE_LOADED,
  COURSE_CREATED,
  COURSE_UPDATED,
  COURSE_UPDATED_CLEAR,
  COURSE_DELETED,
  COURSE_FAIL,
  ADD_STUDENT_GRADE,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";
import { getMessage, clearMessage } from "./messageAction";
import { headerConfig } from "./userAction";

// Load COURSES by id
export const LoadCourse = (_id) => async (dispatch, getState) => {
  try {
    const course = getState().semester.semester.semester.courses.find(
      (c) => c._id === _id
    );

    if (course) {
      dispatch({
        type: COURSE_LOADED,
        payload: course,
      });
    } else {
      dispatch({
        type: COURSE_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.get(`/api/courses/${_id}`, config);

      dispatch({
        type: COURSE_LOADED,
        payload: data,
      });
    }

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: COURSE_FAIL });
  }
};

// Create COURSES
export const CreateCourse =
  (course, semesterId = "current") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSE_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.post(
        `/api/semesters/${semesterId}/courses`,
        course,
        config
      );

      dispatch({
        type: COURSE_CREATED,
        payload: data,
      });

      dispatch(clearErrors());
      dispatch(getMessage("Course created successfully"));
    } catch (err) {
      dispatch(clearMessage());
      dispatch(getErrors(err));
      dispatch({ type: COURSE_FAIL });
    }
  };

// Update Courses
export const UpdateCourse = (department, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.put(`/api/courses/${id}`, department, config);

    dispatch({
      type: COURSE_UPDATED,
      payload: data,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Course updated successfully"));
  } catch (err) {
    dispatch(clearMessage());

    dispatch(getErrors(err));
    dispatch({ type: COURSE_FAIL });
  }
};

export const ClearUpdateSuccess = () => (dispatch) => {
  dispatch({
    type: COURSE_UPDATED_CLEAR,
  });
};

// Delete Courses
export const DeleteCourse = (_id) => async (dispatch, getState) => {
  try {
    const config = headerConfig(getState);

    await axios.delete(`/api/courses/${_id}`, config);

    dispatch({
      type: COURSE_DELETED,
      payload: _id,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Course deleted successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));

    dispatch({ type: COURSE_FAIL });
  }
};

// SHOW STUDENTS PER COURSE
export const ShowStudentPerCourse = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.get(`/api/courses/${_id}/students`, config);

    dispatch({
      type: COURSE_LOADED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: COURSE_FAIL });
  }
};

// add Grades
export const AddStudentsGrade = (_id, data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_LOADING,
    });

    const config = headerConfig(getState);

    const dataRes = await axios.post(
      `/api/courses/${_id}/grades`,
      { grades: data },
      config
    );

    console.log("action data", dataRes.data);

    // dispatch({
    //   type: ADD_STUDENT_GRADE,
    //   payload: dataRes.data,
    // });

    dispatch(ShowStudentPerCourse(_id));

    dispatch(clearErrors());
    dispatch(getMessage("Grades Add successfully"));
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: COURSE_FAIL });
  }
};
