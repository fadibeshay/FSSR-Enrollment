import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import * as yup from "yup";
import { Layout } from "../../container";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  CreateDepartment,
  LoadDepartment,
  UpdateDepartment,
  ClearUpdateSuccess
} from "../../redux/actions/departmentAction";

// Validation
const departmentSchema = yup.object().shape({
  name: yup.string().required()
});
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function AddDepartments({
  errorMessage,
  CreateDepartment,
  LoadDepartment,
  UpdateDepartment,
  ClearUpdateSuccess,
  department,
  success,
  isLoading
}) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(departmentSchema)
  });

  useEffect(() => {
    if (success) {
      ClearUpdateSuccess();
      history.push("/departments");
    }

    if (id) {
      if (!department._id || department._id !== id) {
        LoadDepartment(id);
      } else {
        setValue("name", department.name);
      }
    }
  }, [
    id,
    success,
    department,
    history,
    LoadDepartment,
    ClearUpdateSuccess,
    setValue
  ]);

  const onSubmitForm = (data) => {
    if (id) {
      UpdateDepartment(data, id);
    } else {
      CreateDepartment(data);
    }
  };

  return (
    <Layout>
      <Typography component="h1" variant="h5">
        {id ? "Edit Department" : "Create New Department"}
      </Typography>

      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmitForm)}
        noValidate
      >
        {errorMessage && (
          <Alert severity="error" className="errorPlace">
            {errorMessage}{" "}
          </Alert>
        )}

        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Department name"
              name="name"
              // {...register("name")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.name && <Alert severity="error">{errors.name?.message} </Alert>}

        {!isLoading && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {id ? "Edit " : "Add New"}
          </Button>
        )}

        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress disableShrink />
          </div>
        )}
      </form>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.errors.message,
  department: state.department.department,
  success: state.department.success,
  isLoading: state.department.isLoading
});

export default connect(mapStateToProps, {
  CreateDepartment,
  LoadDepartment,
  UpdateDepartment,
  ClearUpdateSuccess
})(AddDepartments);
