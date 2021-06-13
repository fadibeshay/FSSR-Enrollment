import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
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
	CreateSemester,
	LoadSemester,
	UpdateSemester
} from "../../redux/actions/semesterAction";

// Validation
const semesterSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	startDate: yup.string().required("Start date is required"),
	endDate: yup.string().required("End date is required")
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

function AddSemesters({
	errorMessage,
	CreateSemester,
	LoadSemester,
	UpdateSemester,
	semester,
	success
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
		control
	} = useForm({
		resolver: yupResolver(semesterSchema)
	});

	useEffect(() => {
		if (success) {
			history.push("/semesters");
		}

		if (id) {
			if (!semester._id || semester._id !== id) {
				LoadSemester(id);
			} else {
				const startdateFormated = new Date(semester.startDate)
					.toISOString()
					.split("T")[0];

				const enddateFormated = new Date(semester.endDate)
					.toISOString()
					.split("T")[0];

				setValue("name", semester.name);
				setValue("startDate", startdateFormated);
				setValue("endDate", enddateFormated);
			}
		}
	}, [id, success, semester, history, LoadSemester, setValue]);

	const onSubmitForm = (data) => {
		if (id) {
			UpdateSemester(data, id);
		} else {
			CreateSemester(data);
		}
	};

	return (
		<Layout>
			<Typography component="h1" variant="h5">
				{id ? "Edit Semester" : "Create New Semester"}
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

				<FormControl fullWidth style={{ marginBottom: "1rem" }}>
					<InputLabel id="demo-controlled-open-select-label">
						Semester
					</InputLabel>
					<Controller
						name="name"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Semester"
								required
								fullWidth
								name="name"
								variant="outlined"
								{...register("name")}
								onChange={onChange}
								value={value}
							>
								<MenuItem value={"first"}>First</MenuItem>
								<MenuItem value={"second"}>Second</MenuItem>
								<MenuItem value={"summer"}>Summer</MenuItem>
							</Select>
						)}
					/>

					{errors.name && (
						<Alert severity="error">{errors.name?.message} </Alert>
					)}
				</FormControl>

				<Controller
					name="startDate"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="startDate"
							label="Start Date"
							name="startDate"
							type="date"
							{...register("startDate")}
							onChange={onChange}
							value={value}
							InputLabelProps={{
								shrink: true
							}}
						/>
					)}
				/>

				{errors.startDate && (
					<Alert severity="error">{errors.startDate?.message} </Alert>
				)}

				<Controller
					name="endDate"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="endDate"
							label="End Date"
							name="endDate"
							type="date"
							{...register("endDate")}
							onChange={onChange}
							value={value}
							InputLabelProps={{
								shrink: true
							}}
						/>
					)}
				/>

				{errors.endDate && (
					<Alert severity="error">{errors.endDate?.message} </Alert>
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
	semester: state.semester.semester,
	success: state.semester.success
});

export default connect(mapStateToProps, {
	CreateSemester,
	LoadSemester,
	UpdateSemester
})(AddSemesters);
