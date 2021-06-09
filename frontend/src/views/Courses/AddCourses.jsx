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
import {
  CreateCourses,
  LoadCourses,
  UpdateCourses,
} from "../../redux/actions/coursesAction";

// Validation
const coursesSchema = yup.object().shape({
  name: yup.string().required(),
});
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddCourses({
  errorMessage,
  CreateCourses,
  LoadCourses,
  UpdateCourses,
  courses,
  success,
}) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(coursesSchema),
  });

  useEffect(() => {
    if (success) {
      history.push("/courses");
    }

    if (id) {
      if (!courses._id || courses._id !== id) {
        LoadCourses(id);
      } else {
        setValue("name", courses.name);
      }
    }
  }, [id, success, courses, history, LoadCourses, setValue]);

  const onSubmitForm = (data) => {
    if (id) {
      UpdateCourses(data, id);
    } else {
      CreateCourses(data);
    }
  };

  return (
    <Layout>
      <Typography component="h1" variant="h5">
        {id ? "Edit Courses" : "Create New Courses"}
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
              label="Courses name"
              name="name"
              {...register("name")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.name && <Alert severity="error">{errors.name?.message} </Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {id ? "Edit " : "Add New"}
        </Button>
      </form>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.errors.message,
  courses: state.courses.courses,
  success: state.courses.success,
});

export default connect(mapStateToProps, {
  CreateCourses,
  LoadCourses,
  UpdateCourses,
})(AddCourses);
