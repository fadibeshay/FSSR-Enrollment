import axios from "axios";
import {
  YEAR_LOADING,
  YEARS_LOADED,
  YEAR_LOADED,
  YEAR_CREATED,
  YEAR_UPDATED,
  YEAR_DELETED,
  YEAR_FAIL,
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";
import { headerConfig } from "./userAction";

// Load YEARs
export const LoadYears =
  (name = "", nid = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: YEAR_LOADING,
      });

      const config = headerConfig(getState);

      const { data } = await axios.get(
        `/api/years?name=${name}&nid=${nid}`,
        config
      );

      dispatch({
        type: YEARS_LOADED,
        payload: data,
      });

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: YEAR_FAIL });
    }
  };

// Load YEAR by id
export const LoadYear = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: YEAR_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.get(`/api/years/${_id}`, config);

    dispatch({
      type: YEAR_LOADED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: YEAR_FAIL });
  }
};

// Create YEAR
export const CreateYear = (year) => async (dispatch, getState) => {
  try {
    dispatch({
      type: YEAR_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.post("/api/years", year, config);

    dispatch({
      type: YEAR_CREATED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: YEAR_FAIL });
  }
};

// Update Year
export const UpdateYear = (year, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: YEAR_LOADING,
    });

    const config = headerConfig(getState);

    const { data } = await axios.put(`/api/years/${id}`, year, config);

    dispatch({
      type: YEAR_UPDATED,
      payload: data,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: YEAR_FAIL });
  }
};

// Delete Year
export const DeleteYear = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: YEAR_LOADING,
    });

    const config = headerConfig(getState);

    await axios.delete(`/api/years/${_id}`, config);

    dispatch({
      type: YEAR_DELETED,
      payload: _id,
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: YEAR_FAIL });
  }
};
