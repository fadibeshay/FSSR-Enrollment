import axios from "axios";
import {
  DEPARTMENT_LOADING,
  DEPARTMENTS_LOADED,
  DEPARTMENT_LOADED,
  DEPARTMENT_CREATED,
  DEPARTMENT_UPDATED,
  DEPARTMENT_DELETED,
  DEPARTMENT_FAIL,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";
import { getMessage, clearMessage } from "./messageAction";
import { headerConfig } from "./userAction";

// Load DEPARTMENTs
export const LoadDepartments =
  (name = "", nid = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DEPARTMENT_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.get(
        `/api/departments?name=${name}&nid=${nid}`,
        config
      );

      dispatch({
        type: DEPARTMENTS_LOADED,
        payload: data,
      });

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: DEPARTMENT_FAIL });
    }
  };

// Load DEPARTMENT by id
export const LoadDepartment = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.get(`/api/departments/${_id}`, config);

    dispatch({
      type: DEPARTMENT_LOADED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: DEPARTMENT_FAIL });
  }
};

// Create DEPARTMENT
export const CreateDepartment = (department) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.post("/api/departments", department, config);

    dispatch({
      type: DEPARTMENT_CREATED,
      payload: data,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Department created successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));
    dispatch({ type: DEPARTMENT_FAIL });
  }
};

// Update Department
export const UpdateDepartment =
  (department, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DEPARTMENT_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.put(
        `/api/departments/${id}`,
        department,
        config
      );

      dispatch({
        type: DEPARTMENT_UPDATED,
        payload: data,
      });

      dispatch(clearErrors());
      dispatch(getMessage("Department updated successfully"));
    } catch (err) {
      dispatch(clearMessage());

      dispatch(getErrors(err));
      dispatch({ type: DEPARTMENT_FAIL });
    }
  };

// Delete Department
export const DeleteDepartment = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_LOADING,
    });

    const config = headerConfig(getState);

    await axios.delete(`/api/departments/${_id}`, config);

    dispatch({
      type: DEPARTMENT_DELETED,
      payload: _id,
    });

    dispatch(clearErrors());
    dispatch(getMessage("Department deleted successfully"));
  } catch (err) {
    dispatch(clearMessage());
    dispatch(getErrors(err));

    dispatch({ type: DEPARTMENT_FAIL });
  }
};
