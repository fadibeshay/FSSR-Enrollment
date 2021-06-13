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
import style from "./Years.module.css";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Breadcrumbs } from "@material-ui/core";
import Moment from "react-moment";

import { LoadYear, DeleteYear } from "../../redux/actions/yearAction";

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

function YearSemesters({ LoadYear, DeleteYear, year, isLoading }) {
	const classes = useStyles();
	const { id } = useParams();

	// const confirmDeleteSemesters = (id) => {
	// 	window.confirm("Are You Sure?") && DeleteYear(id);
	// };

	useEffect(() => {
		LoadYear(id);
	}, [LoadYear, id]);

	return (
		<Layout>
			{!isLoading && (
				<Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "10px" }}>
					<Link color="inherit" to="/years">
						{year.year}
					</Link>

					<Typography color="textPrimary">Semesters</Typography>
				</Breadcrumbs>
			)}

			<Grid container className={classes.root} spacing={2}>
				{!isLoading &&
					year.semesters.map((semester) => (
						<Grid item md={4} key={semester._id}>
							<Link to={`/semesters/${semester._id}/courses`}>
								<Card className={classes.root}>
									<CardContent>
										<Typography
											variant="h6"
											component="p"
											color="textSecondary"
										>
											{semester.name.toUpperCase()}
										</Typography>
										<Typography component="p" color="textSecondary">
											Start Date{" "}
											<Moment format="YYYY/MM/DD">{semester.startDate}</Moment>
											<br />
											End Date :{" "}
											<Moment format="YYYY/MM/DD">{semester.endDate}</Moment>
										</Typography>
									</CardContent>
									{/* <CardActions>
                    <Button>
                      <Link
                        to={`/semesters/add/${semester._id}`}
                        style={{
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        <EditIcon />
                      </Link>
                    </Button>

                    <Button
                      onClick={() => confirmDeleteSemesters(semester._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardActions> */}
								</Card>
							</Link>
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
	year: state.year.year,
	isLoading: state.year.isLoading
});

export default connect(mapStateToProps, { LoadYear, DeleteYear })(
	YearSemesters
);
