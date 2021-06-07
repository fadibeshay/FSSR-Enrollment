import React, { useState, useEffect } from "react";

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
  CreateYear,
  UpdateYear,
  LoadYear,
} from "../../redux/actions/yearAction";

// Validation
const yearSchema = yup.object().shape({
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

function AddYears({ errorMessage, CreateYear, LoadYear, UpdateYear, year }) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yearSchema),
  });

  useEffect(() => {
    if (id) {
      LoadYear(id);
    }
  }, []);

  const onSubmitForm = async (data) => {
    if (id) {
      await UpdateYear(data, id);
      setValue("name", data);
    } else {
      await CreateYear(data);
    }
    history.push("/years");
  };

  return (
    <Layout>
      <Typography component="h1" variant="h5">
        {id ? "Edit Year" : "Create New Year"}
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
          id="year"
          label="Year Format 0000-0000"
          name="year"
          {...register("year")}
        />
        {errors.year && <Alert severity="error">{errors.year?.message} </Alert>}

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
  year: state.year.year,
});

export default connect(mapStateToProps, {
  CreateYear,
  LoadYear,
  UpdateYear,
})(AddYears);
