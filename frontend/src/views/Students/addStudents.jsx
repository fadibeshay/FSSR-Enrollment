import React, { useRef, useEffect } from "react";

import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Layout } from "../../container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import style from "./Students.module.css";
import placeholderUser from "../../assets/placeholder.png";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { CreateStudent } from "../../redux/actions/studentAction";
import { LoadDepartments } from "../../redux/actions/departmentAction";

// Validation
const studentSchema = yup.object().shape({
  email: yup.string().email().required(),
  fullNameEn: yup.string().required("English Full Name Is Required"),
  fullNameAr: yup.string().required("Arabic Full Name Is Required"),
  nid: yup.number().required("National ID Is Required"),
  birthday: yup.string().required(),
  gender: yup.string().required(),
  militaryStatus: yup.string().required(),
  photo: yup.string().required(),
  degree: yup.string().required(),
  gradYear: yup.number().required(),
  address: yup.string().required(),
  phoneNumber: yup.string().required(),
  department: yup.string().required(),
  level: yup.string().required(),
  password: yup.string().min(6).required(),
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

function AddStudents({
  errorMessage,
  departments,
  CreateStudent,
  LoadDepartments,
  isLoading,
}) {
  const classes = useStyles();
  const history = useHistory();
  // const fileInput = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(studentSchema),
  });

  useEffect(() => {
    LoadDepartments();
  }, []);

  const onSubmitForm = async (data) => {
    // console.log("data :>> ", data);
    await CreateStudent(data);

    if (!errorMessage) {
      // history.push("/students");
      // reset(data);
      console.log(`errorMessage if`, errorMessage);
    } else {
      window.scrollTo(0, 0);
      console.log(`errorMessage else `, errorMessage);
    }
  };

  return (
    <Layout>
      <Typography component="h1" variant="h5">
        Create New User
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmitForm)}
        noValidate
      >
        {errorMessage && <Alert severity="error">{errorMessage} </Alert>}

        {/* <div className={style.photoContainer}>
          <img src={placeholderUser} />
        </div> */}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="file"
          name="photo"
          id="photo"
          {...register("photo")}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {errors.photo && (
          <Alert severity="error">{errors.photo?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="fullNameAr"
          label="Full Name In Arabic"
          name="fullNameAr"
          {...register("fullNameAr")}
        />
        {errors.fullNameAr && (
          <Alert severity="error">{errors.fullNameAr?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="fullNameEn"
          label="Full Name In English"
          name="fullNameEn"
          {...register("fullNameEn")}
        />

        {errors.fullNameEn && (
          <Alert severity="error">{errors.fullNameEn?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nid"
          label="National ID Number"
          name="nid"
          {...register("nid")}
        />

        {errors.nid && <Alert severity="error">{errors.nid?.message} </Alert>}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="militaryStatus"
          label="military Status"
          name="militaryStatus"
          {...register("militaryStatus")}
        />

        {errors.militaryStatus && (
          <Alert severity="error">{errors.militaryStatus?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="address"
          label="address"
          name="address"
          {...register("address")}
        />

        {errors.address && (
          <Alert severity="error">{errors.address?.message} </Alert>
        )}

        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-controlled-open-select-label">gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            id="gender"
            label="gender"
            required
            fullWidth
            name="gender"
            variant="outlined"
            // onChange={handleSelectChange}
            {...register("gender")}
          >
            <MenuItem value={"male"}>male</MenuItem>
            <MenuItem value={"female"}>female</MenuItem>
          </Select>

          {errors.gender && (
            <Alert severity="error">{errors.gender?.message} </Alert>
          )}
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-controlled-open-select-label">level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            id="level"
            label="level"
            required
            fullWidth
            name="level"
            variant="outlined"
            // onChange={handleSelectChange}
            {...register("level")}
          >
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
          </Select>

          {errors.level && (
            <Alert severity="error">{errors.level?.message} </Alert>
          )}
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          {...register("phoneNumber")}
        />

        {errors.phoneNumber && (
          <Alert severity="error">{errors.phoneNumber?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="birthday"
          label="birthday"
          name="birthday"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("birthday")}
        />

        {errors.birthday && (
          <Alert severity="error">{errors.birthday?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="degree"
          label="degree"
          name="degree"
          {...register("degree")}
        />

        {errors.degree && (
          <Alert severity="error">{errors.degree?.message} </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="gradYear"
          label="Graduation Year"
          name="gradYear"
          type="number"
          {...register("gradYear")}
        />

        {errors.gradYear && (
          <Alert severity="error">{errors.gradYear?.message} </Alert>
        )}

        <FormControl fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            Department
          </InputLabel>

          {departments && (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              id="department"
              label="department"
              required
              fullWidth
              name="department"
              variant="outlined"
              {...register("department")}
            >
              {departments.map((dep) => (
                <MenuItem value={dep.name} key={dep._id}>
                  {dep.name}
                </MenuItem>
              ))}
            </Select>
          )}

          {errors.department && (
            <Alert severity="error">{errors.department?.message} </Alert>
          )}
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          Add New
        </Button>
      </form>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.errors.message,
  departments: state.department.departments,
  isLoading: state.student.isLoading,
});

export default connect(mapStateToProps, { CreateStudent, LoadDepartments })(
  AddStudents
);
