import React, { useEffect, useState } from "react";
import { Layout } from "../../container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import style from "./Courses.module.css";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { LoadSemester } from "../../redux/actions/semesterAction";
import { DeleteCourses } from "../../redux/actions/coursesAction";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  inputContainer: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 250,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function Courses({ semester, isLoading, LoadSemester, DeleteCourses }) {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const confirmDeleteCourses = (id) => {
    window.confirm("Are You Sure?") && DeleteCourses(id);
  };

  useEffect(() => {
    LoadSemester('current');
  }, [LoadSemester]);

  const onCoursesSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    // LoadCourses(search);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Button variant="contained" color="primary">
          <Link type="link" className={style.addBtn} to={"/courses/add"}>
            Add Course
          </Link>
        </Button>

        <Paper component="form" className={classes.inputContainer}>
          <InputBase
            className={classes.input}
            placeholder="Search Courses"
            inputProps={{ "aria-label": "Search Courses" }}
            onChange={onCoursesSearch}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={onCoursesSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <Grid container className={classes.root} spacing={2}>
        {!isLoading &&
          semester.courses &&
          semester.courses.map((course) => (
            <Grid item md={4} key={course._id}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" component="p" color="textSecondary">
                    {course.subject.code}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button>
                    <Link
                      to={`/courses/add/${course._id}`}
                      style={{
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      <EditIcon />
                    </Link>
                  </Button>

                  <Button onClick={() => confirmDeleteCourses(course._id)}>
                    <DeleteIcon />
                  </Button>
                </CardActions>
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
  isLoading: state.semester.isLoading,
});

export default connect(mapStateToProps, { LoadSemester, DeleteCourses })(
  Courses
);
