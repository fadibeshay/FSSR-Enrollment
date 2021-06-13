import React, { useEffect, useState } from "react";
import { Layout } from "../../container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Button, Grid } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import style from "./Semesters.module.css";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Breadcrumbs } from "@material-ui/core";
import { isEmpty } from "../../helper";
import {
	LoadSemester,
	DeleteSemester
} from "../../redux/actions/semesterAction";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275
	},
	inputContainer: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		width: 250
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
}));

function SemesterCourses({
	semester,
	isLoading,
	LoadSemester,
	DeleteSemester
}) {
	const classes = useStyles();
	const { id } = useParams();

	const confirmDeleteSemester = (id) => {
		window.confirm("Are You Sure?") && DeleteSemester(id);
	};

	useEffect(() => {
		LoadSemester(id);
	}, [LoadSemester, id]);

	return (
		<Layout>
			{!isLoading && (
				<Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "10px" }}>
					<Link color="inherit" to={`/years`}>
						{semester.acadYear.year}
					</Link>

					<Link
						color="inherit"
						to={`/years/${semester.acadYear._id}/semesters`}
					>
						{semester.name}
					</Link>

					<Typography color="textPrimary">Courses</Typography>
				</Breadcrumbs>
			)}

			<Grid container className={classes.root} spacing={2}>
				{!isLoading &&
					semester.courses.map((course) => (
						<Grid item md={4} key={course._id}>
							<Card className={classes.root}>
								<CardContent>
									<Typography variant="h4" component="p" color="textSecondary">
										{course.subject.code}
									</Typography>
									<Typography variant="h5" component="p" color="textSecondary">
										{course.subject.title}
									</Typography>
									<Typography variant="h6" component="p">
										{course.instructor}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>

			{isLoading && (
				<div style={{ textAlign: "center" }}>
					<CircularProgress disableShrink />
				</div>
			)}
		</Layout>
	);
}

const mapStateToProps = (state) => ({
	semester: state.semester.semester,
	isLoading: state.semester.isLoading
});

export default connect(mapStateToProps, { LoadSemester, DeleteSemester })(
	SemesterCourses
);
