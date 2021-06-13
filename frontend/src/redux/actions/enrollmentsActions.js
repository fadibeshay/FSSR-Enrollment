import axios from "axios";
import {
  ENROLLMENTS_LOADED,
  ENROLLMENTS_STUDENT_LOADED,
  ENROLLMENTS_LOADING,
  ENROLLMENTS_STUDENT_CREATED,
  ENROLLMENTS_APPROVED,
  ENROLLMENTS_FAIL,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";
import { getMessage, clearMessage } from "./messageAction";
import { headerConfig } from "./userAction";

// ? Admin Actions Enrollments
// Load Enrollment for admin
export const LoadAdminEnrollments =
  (name = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ENROLLMENTS_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.get(`/api/enrols?name=${name}`, config);

      dispatch({
        type: ENROLLMENTS_LOADED,
        payload: data,
      });

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: ENROLLMENTS_FAIL });
    }
  };
// get  Enrollment by user ID
export const LoadEnrollmentsById = (_id) => async (dispatch) => {
  try {
    dispatch({
      type: ENROLLMENTS_LOADED,
    });

    const config = headerConfig();

    const { data } = await axios.get(`/api/enrols/${_id}`, config);

    dispatch({
      type: ENROLLMENTS_LOADED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: ENROLLMENTS_FAIL });
  }
};

// ? Students Actions Enrollments
// Load Enrollment for Students
export const LoadStudentEnrollments = async (dispatch, getState) => {
  try {
    dispatch({
      type: ENROLLMENTS_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.get(`/api/enrols/my`, config);

    dispatch({
      type: ENROLLMENTS_STUDENT_LOADED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: ENROLLMENTS_FAIL });
  }
};

// Load ENROLLMENTS by id
// export const LoadDepartment = (_id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ENROLLMENTS_LOADING,
//     });

//     const config = headerConfig(getState);

//     const { data } = await axios.get(`/api/departments/${_id}`, config);

//     dispatch({
//       type: ENROLLMENTS_LOADED,
//       payload: data,
//     });

//     dispatch(clearErrors());
//   } catch (err) {
//     dispatch(getErrors(err));
//     dispatch({ type: ENROLLMENTS_FAIL });
//   }
// };

// // Create ENROLLMENTS
// export const CreateDepartment = (department) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ENROLLMENTS_LOADING,
//     });

//     const config = headerConfig(getState);

//     const { data } = await axios.post("/api/departments", department, config);

//     dispatch({
//       type: ENROLLMENTS_CREATED,
//       payload: data,
//     });

//     dispatch(clearErrors());
//     dispatch(getMessage("Department created successfully"));
//   } catch (err) {
//     dispatch(clearMessage());
//     dispatch(getErrors(err));
//     dispatch({ type: ENROLLMENTS_FAIL });
//   }
// };

// // Update Department
// export const UpdateDepartment =
//   (department, id) => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: ENROLLMENTS_LOADING,
//       });

//       const config = headerConfig(getState);

//       const { data } = await axios.put(
//         `/api/departments/${id}`,
//         department,
//         config
//       );

//       dispatch({
//         type: ENROLLMENTS_UPDATED,
//         payload: data,
//       });

//       dispatch(clearErrors());
//       dispatch(getMessage("Department updated successfully"));
//     } catch (err) {
//       dispatch(clearMessage());

//       dispatch(getErrors(err));
//       dispatch({ type: ENROLLMENTS_FAIL });
//     }
//   };
