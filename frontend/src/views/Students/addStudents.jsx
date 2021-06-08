import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import * as yup from "yup";
import { Layout } from "../../container";
import Moment from "react-moment";
import {
  CreateStudent,
  UpdateStudent,
  LoadStudent,
} from "../../redux/actions/studentAction";

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
  LoadStudent,
  isLoading,
  student,
  UpdateStudent,
  LoadDepartments,
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
    success,
  } = useForm({
    resolver: yupResolver(studentSchema),
  });

  useEffect(() => {
    LoadDepartments();
    if (success) {
      history.push("/years");
    } else {
      window.scrollTo(0, 0);
    }

    if (id) {
      if (!student._id || student._id !== id) {
        LoadStudent(id);
      } else {
        const dateFormat = new Date(student.birthday).toLocaleDateString(
          "en-US"
        );
        reset({
          email: student.email,
          fullNameEn: student.fullNameEn,
          fullNameAr: student.fullNameAr,
          nid: student.nid,
          birthday: dateFormat,
          gender: student.gender,
          militaryStatus: student.militaryStatus,
          // photo: student.photo,
          degree: student.degree,
          gradYear: student.gradYear,
          address: student.address,
          phoneNumber: student.phoneNumber,
          department: student.major.name,
          level: student.level,
          password: student.password,
        });
      }
    }
  }, [id, student, reset, success]);

  const onSubmitForm = (data) => {
    if (id) {
      UpdateStudent(data, id);
    } else {
      CreateStudent(data);
    }
  };

  return (
    <Layout>
      <Typography component="h1" variant="h5">
        {id ? "Edit User" : "Create New User"}
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
          name="photo"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="file"
              name="photo"
              id="photo"
              {...register("photo")}
              value={value}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        {errors.photo && (
          <Alert severity="error">{errors.photo?.message} </Alert>
        )}

        <Controller
          name="fullNameAr"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullNameAr"
              label="Full Name In Arabic"
              name="fullNameAr"
              {...register("fullNameAr")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.fullNameAr && (
          <Alert severity="error">{errors.fullNameAr?.message} </Alert>
        )}

        <Controller
          name="fullNameEn"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullNameEn"
              label="Full Name In English"
              name="fullNameEn"
              {...register("fullNameEn")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.fullNameEn && (
          <Alert severity="error">{errors.fullNameEn?.message} </Alert>
        )}

        <Controller
          name="nid"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nid"
              label="National ID Number"
              name="nid"
              {...register("nid")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.nid && <Alert severity="error">{errors.nid?.message} </Alert>}

        <Controller
          name="militaryStatus"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="militaryStatus"
              label="military Status"
              name="militaryStatus"
              {...register("militaryStatus")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.militaryStatus && (
          <Alert severity="error">{errors.militaryStatus?.message} </Alert>
        )}

        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="address"
              name="address"
              {...register("address")}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.address && (
          <Alert severity="error">{errors.address?.message} </Alert>
        )}

        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-controlled-open-select-label">gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                id="gender"
                label="gender"
                required
                fullWidth
                name="gender"
                variant="outlined"
                value={value}
                onChange={onChange}
                {...register("gender")}
              >
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"female"}>female</MenuItem>
              </Select>
            )}
          />

          {errors.gender && (
            <Alert severity="error">{errors.gender?.message} </Alert>
          )}
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel id="demo-controlled-open-select-label">level</InputLabel>

          <Controller
            name="level"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                id="level"
                label="level"
                required
                fullWidth
                name="level"
                variant="outlined"
                {...register("level")}
                onChange={onChange}
                value={value}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
              </Select>
            )}
          />

          {errors.level && (
            <Alert severity="error">{errors.level?.message} </Alert>
          )}
        </FormControl>

        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              {...register("phoneNumber")}
              onChange={onChange}
              value={value}
            />
          )}
        />

        {errors.phoneNumber && (
          <Alert severity="error">{errors.phoneNumber?.message} </Alert>
        )}

        <Controller
          name="birthday"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="birthday"
              label="birthday"
              name="birthday"
              type="date"
              {...register("birthday")}
              onChange={onChange}
              value={value}
            />
          )}
        />

        {errors.birthday && (
          <Alert severity="error">{errors.birthday?.message} </Alert>
        )}

        <Controller
          name="degree"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="degree"
              label="degree"
              name="degree"
              {...register("degree")}
              onChange={onChange}
              value={value}
            />
          )}
        />

        {errors.degree && (
          <Alert severity="error">{errors.degree?.message} </Alert>
        )}

        <Controller
          name="gradYear"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              id="gradYear"
              label="gradYear"
              name="Graduation Year"
              {...register("gradYear")}
              onChange={onChange}
              value={value}
            />
          )}
        />

        {errors.gradYear && (
          <Alert severity="error">{errors.gradYear?.message} </Alert>
        )}

        <FormControl fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            Department
          </InputLabel>

          {departments && (
            <Controller
              name="department"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
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
                  onChange={onChange}
                  value={value}
                >
                  {departments.map((dep) => (
                    <MenuItem value={dep.name} key={dep._id}>
                      {dep.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          )}

          {errors.department && (
            <Alert severity="error">{errors.department?.message} </Alert>
          )}
        </FormControl>

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
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
              value={value}
              onChange={onChange}
            />
          )}
        />

        {errors.email && (
          <Alert severity="error">{errors.email?.message} </Alert>
        )}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
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
              value={value}
              onChange={onChange}
            />
          )}
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
          {id ? "Edit " : "Add New"}
        </Button>
      </form>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  errorMessage: state.errors.message,
  departments: state.department.departments,
  isLoading: state.student.isLoading,
  student: state.student.student,
  success: state.student.success,
});

export default connect(mapStateToProps, {
  CreateStudent,
  LoadStudent,
  UpdateStudent,
  LoadDepartments,
})(AddStudents);
