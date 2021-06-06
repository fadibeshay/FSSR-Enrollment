import React, { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import * as yup from "yup";
import { Layout } from "../../container";
import {
  CreateSubject,
  UpdateSubject,
  LoadSubject,
} from "../../redux/actions/subjectAction";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// Validation
const subjectSchema = yup.object().shape({
  title: yup.string().required(),
  code: yup.string().required(),
  credit: yup.string().required(),
  prerequisite: yup.string(),
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

function AddSubjects({
  errorMessage,
  CreateSubject,
  LoadSubject,
  UpdateSubject,
  subject,
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
  } = useForm({
    resolver: yupResolver(subjectSchema),
  });

  useEffect(() => {
    if (id) {
      LoadSubject(id);
    }
  }, []);

  const onSubmitForm = async (data) => {
    if (id) {
      await UpdateSubject(data, id);
      setValue("name", data);
    } else {
      await CreateSubject(data);
    }
    history.push("/subjects");
  };

  return (
    <Layout>
      <Typography component="h1" variant="h5">
        {id ? "Edit subject" : "Create New subject"}
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

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="subject title"
          name="title"
          {...register("title")}
        />
        {errors.title && (
          <Alert severity="error">{errors.title?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="code"
          label="subject code"
          name="code"
          {...register("code")}
        />
        {errors.code && <Alert severity="error">{errors.code?.message} </Alert>}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="prerequisite"
          label="subject prerequisite"
          name="prerequisite"
          {...register("prerequisite")}
        />
        {errors.prerequisite && (
          <Alert severity="error">{errors.prerequisite?.message} </Alert>
        )}

        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-controlled-open-select-label">credit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            id="credit"
            label="credit"
            required
            fullWidth
            name="credit"
            variant="outlined"
            // onChange={handleSelectChange}
            {...register("credit")}
          >
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
          </Select>

          {errors.credit && (
            <Alert severity="error">{errors.credit?.message} </Alert>
          )}
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add New
        </Button>
      </form>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.errors.message,
  subject: state.subject.subject,
});

export default connect(mapStateToProps, {
  CreateSubject,
  LoadSubject,
  UpdateSubject,
})(AddSubjects);
