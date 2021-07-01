import axios from "axios";
import {
  ENROLLMENT_COURSE_ADDED,
  ENROLLMENT_APPROVED,
  ENROLLMENTS_FAIL,
  ENROLLMENTS_LOADED,
  ENROLLMENTS_LOADING,
  ENROLLMENT_STUDENT_LOADED,
  ENROLLMENT_COURSE_DELETED
} from "./actionTypes";
import { clearErrors, getErrors } from "./errorsAction";
import { clearMessage, getMessage } from "./messageAction";
import { headerConfig } from "./userAction";

// ! Admin Actions Enrollments
// Load Enrollment for admin
export const LoadAdminEnrollments =
  (keyword = "", page = 1, pageSize = 9) =>
  async (dispatch, getState) => {
    try {
      if (
        getState().enrollment.enrollments.enrols.length === 0 ||
        !getState().enrollment.enrollments.page ||
        getState().enrollment.search !== keyword ||
        getState().enrollment.enrollments.page !== page
      ) {
        dispatch({
          type: ENROLLMENTS_LOADING
        });

        const config = headerConfig(getState);

        const { data } = await axios.get(
          `/api/enrols?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
          config
        );

        dispatch({
          type: ENROLLMENTS_LOADED,
          payload: { enrols: data, search: keyword }
        });
      }

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: ENROLLMENTS_FAIL });
    }
  };

// get  Enrollment by user ID
export const LoadEnrollmentById = (_id) => async (dispatch, getState) => {
  try {
    if (getState().enrollment.enrollment._id !== _id) {
      dispatch({
        type: ENROLLMENTS_LOADING
      });

      const config = headerConfig();

      const { data } = await axios.get(`/api/enrols/${_id}`, config);

      dispatch({
        type: ENROLLMENT_STUDENT_LOADED,
        payload: data
      });
    }

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: ENROLLMENTS_FAIL });
  }
};

//  Approved Enrollments
export const ApproveEnrollment = (_id, isApproved) => async (dispatch) => {
  try {
    // dispatch({
    //   type: ENROLLMENTS_LOADING
    // });

    const config = headerConfig();

    const { data } = await axios.put(
      `/api/enrols/${_id}/approve`,
      isApproved,
      config
    );
    dispatch({
      type: ENROLLMENT_APPROVED,
      payload: data
    });

    dispatch(clearErrors());
    dispatch(getMessage("Enrollment Updated Successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));

    dispatch({ type: ENROLLMENTS_FAIL });
  }
};

// Add Course To Enrollments
export const AddCourseToEnrollment =
  (enrollmentId, courseId) => async (dispatch) => {
    try {
      dispatch({
        type: ENROLLMENTS_LOADING
      });

      const config = headerConfig();

      const { data } = await axios.put(
        `/api/enrols/${enrollmentId}/courses/${courseId}`,
        {},
        config
      );

      dispatch({
        type: ENROLLMENT_COURSE_ADDED,
        payload: data
      });

      dispatch(clearErrors());
      dispatch(getMessage("Course Added Successfully"));
    } catch (err) {
      dispatch(clearMessage());
      dispatch(getErrors(err));

      dispatch({ type: ENROLLMENTS_FAIL });
    }
  };

// Delete Enrollment Course
export const RemoveCourseFromEnrol =
  (enrollmentId, courseId) => async (dispatch) => {
    try {
      dispatch({
        type: ENROLLMENTS_LOADING
      });

      const config = headerConfig();

      const { data } = await axios.delete(
        `/api/enrols/${enrollmentId}/courses/${courseId}`,
        config
      );

      dispatch({
        type: ENROLLMENT_COURSE_DELETED,
        payload: data
      });

      dispatch(clearErrors());
      dispatch(getMessage("Course Deleted Successfully"));
    } catch (err) {
      dispatch(clearMessage());
      dispatch(getErrors(err));

      dispatch({ type: ENROLLMENTS_FAIL });
    }
  };

// ! Students Actions Enrollments
// Load Enrollment for Students
export const LoadStudentEnrollment = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENROLLMENTS_LOADING
    });

    const config = headerConfig(getState);

    const { data } = await axios.get(`/api/enrols/my`, config);

    dispatch({
      type: ENROLLMENT_STUDENT_LOADED,
      payload: data
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: ENROLLMENTS_FAIL });
  }
};

// Select Course
export const UpdateStudentEnrollment = (courses) => async (dispatch) => {
  try {
    dispatch({
      type: ENROLLMENTS_LOADING
    });

    const config = headerConfig();

    await axios.put(`/api/enrols/my`, courses, config);

    dispatch(LoadStudentEnrollment());

    dispatch(clearErrors());
    dispatch(getMessage("Enrollment Updated Successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));

    dispatch({ type: ENROLLMENTS_FAIL });
  }
};
