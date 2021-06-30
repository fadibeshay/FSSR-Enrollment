import axios from "axios";
import {
  YEAR_LOADING,
  YEARS_LOADED,
  YEAR_LOADED,
  YEAR_CREATED,
  YEAR_UPDATED,
  YEAR_UPDATED_CLEAR,
  YEAR_DELETED,
  YEAR_FAIL
} from "./actionTypes";
import { getErrors, clearErrors } from "./errorsAction";
import { headerConfig } from "./userAction";

// Load YEARs
export const LoadYears =
  (keyword = "", page = 1, pageSize = 9) =>
  async (dispatch, getState) => {
    try {
      if (
        getState().year.years.acadYears.length === 0 ||
        !getState().year.years.page ||
        getState().year.search !== keyword ||
        getState().year.years.page !== page
      ) {
        dispatch({
          type: YEAR_LOADING
        });

        const config = headerConfig(getState);

        const { data } = await axios.get(
          `/api/acadyears?year=${keyword}&page=${page}&pageSize=${pageSize}`,
          config
        );

        dispatch({
          type: YEARS_LOADED,
          payload: { years: data, search: keyword }
        });
      }

      dispatch(clearErrors());
    } catch (err) {
      dispatch(getErrors(err));
      dispatch({ type: YEAR_FAIL });
    }
  };

// Load YEAR by id
export const LoadYear = (_id) => async (dispatch, getState) => {
  try {
    const current = _id === "current";

    if (
      !getState().year.year._id ||
      current !== getState().year.year.current ||
      (!current && _id !== getState().year.year._id)
    ) {
      dispatch({
        type: YEAR_LOADING
      });

      const config = headerConfig(getState);

      const { data } = await axios.get(`/api/acadyears/${_id}`, config);

      dispatch({
        type: YEAR_LOADED,
        payload: { ...data, current: current }
      });
    }
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
      type: YEAR_LOADING
    });

    const config = headerConfig(getState);

    const { data } = await axios.post("/api/acadyears", year, config);

    dispatch({
      type: YEAR_CREATED,
      payload: data
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
      type: YEAR_LOADING
    });

    const config = headerConfig(getState);

    const { data } = await axios.put(`/api/acadyears/${id}`, year, config);

    dispatch({
      type: YEAR_UPDATED,
      payload: data
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: YEAR_FAIL });
  }
};

export const ClearUpdateSuccess = () => (dispatch) => {
  dispatch({
    type: YEAR_UPDATED_CLEAR
  });
};

// Delete Year
export const DeleteYear = (_id) => async (dispatch, getState) => {
  try {
    const config = headerConfig(getState);

    await axios.delete(`/api/acadyears/${_id}`, config);

    dispatch({
      type: YEAR_DELETED,
      payload: _id
    });

    dispatch(clearErrors());
  } catch (err) {
    dispatch(getErrors(err));
    dispatch({ type: YEAR_FAIL });
  }
};
