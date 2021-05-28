import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect } from "react-redux";
import { LoginUser } from "../redux/actions/userAction";

const authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const authSchema = Yup.object().shape({
//   email: Yup.email().required(),
//   password: Yup.required(),
// });

function Login({ loadingLogin, LoginUser, errorMessage, token }) {
  const classes = useStyles();
  const history = useHistory();

  // This field is required
  // invalid Email!

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const onSubmit = (data) => {
    LoginUser(data);

    // if (token) {
    //   console.log("Hello");
    //     history.push('/login')

    // }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          FSSR Enrollment System
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {errorMessage && <Alert severity="error">{errorMessage} </Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email")}
          />

          {errors.email && (
            <Alert severity="error">{errors.email?.message} </Alert>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            {...register("password", { required: true })}
          />

          {errors.password && (
            <Alert severity="error">{errors.password?.message} </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loadingLogin: state.user.isLoading,
  errorMessage: state.errors.message,
  token: state.user.user?.token,
});

export default connect(mapStateToProps, { LoginUser })(Login);
