import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	LoadStudentEnrollments,
	SelectedCourse
} from "../../redux/actions/enrollmentsActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { isEmpty } from "../../helper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Chip, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	},
	studentContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: "10px"
	},
	spaceMargin: {
		marginBottom: "10px"
	}
}));

function StudentEnrollments() {
	const classes = useStyles();
	const [selectedCourses, setSelectedCourses] = useState([]);
	const isLoading = useSelector((state) => state.enrollment.isLoading);
	const dispatch = useDispatch();
	const enrollment = useSelector((state) => state.enrollment.enrollment);

	useEffect(() => {
		dispatch(LoadStudentEnrollments());
	}, []);

	const selectCourse = (id) => {
		setSelectedCourses((prev) => [...prev, id]);
	};

	const sendIds = (ids) => {
		dispatch(SelectedCourse({ courses: ids }));
		setSelectedCourses([]);
	};

	return (
		<div>
			<Typography
				variant="h6"
				component="p"
				color="textSecondary"
				className={classes.spaceMargin}
			>
				Select Your Courses
			</Typography>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Code</TableCell>
							<TableCell align="left">title</TableCell>
							<TableCell align="left">credit</TableCell>
							<TableCell align="left">instructor</TableCell>
							<TableCell align="left">status</TableCell>
							<TableCell align="center" colSpan={2}>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!isLoading &&
							enrollment.courses &&
							enrollment.courses.map((enroll) => (
								<TableRow key={enroll._id}>
									<TableCell align="left">{enroll.code}</TableCell>
									<TableCell align="left">{enroll.title}</TableCell>
									<TableCell align="left">{enroll.credit}</TableCell>
									<TableCell align="left">{enroll.instructor}</TableCell>
									<TableCell align="left">
										{enroll.selected ? (
											<Chip label="Selected" color="primary" />
										) : (
											<Chip label="Not Selected" color="secondary" />
										)}
									</TableCell>

									<TableCell align="left">
										<FormControlLabel
											control={
												<Checkbox
													onClick={() => selectCourse(enroll._id)}
													color="primary"
												/>
											}
											label="Selected"
										/>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			{selectedCourses.length > 0 && (
				<div className={classes.studentContainer}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => sendIds(selectedCourses)}
					>
						Send
					</Button>
				</div>
			)}

			{isLoading && (
				<div style={{ textAlign: "center" }}>
					<CircularProgress disableShrink />
				</div>
			)}
		</div>
	);
}

export default StudentEnrollments;
