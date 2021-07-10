import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Layout } from "../../container";
import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { isEmpty } from "../../helper";
import {
  ShowStudentPerCourse,
  AddStudentsGrade,
} from "../../redux/actions/coursesAction";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
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
  table: {
    minWidth: 650,
  },
  studentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10px",
  },
}));

function ShowCourseStudents({}) {
  const classes = useStyles();
  const { id } = useParams();
  const courses = useSelector((state) => state.course.course);
  const isLoading = useSelector((state) => state.course.isLoading);
  const dispatch = useDispatch();
  const [grades, setGrade] = useState([]);

  useEffect(() => {
    dispatch(ShowStudentPerCourse(id));
    // LoadSemester("current", keyword, currentPage || 1);
  }, [id, ShowStudentPerCourse]);

  useEffect(() => {
    // Remove old Grades
    setGrade([]);

    // Add New Grades
    if (!isLoading && !isEmpty(courses)) {
      setGrade(
        courses.map((course) => {
          return { student: course.student._id, percent: course.grade.percent };
        })
      );
    }
  }, [courses, isLoading, setGrade]);

  const onSubmit = (id) => {
    window.confirm("Are You Sure?") && dispatch(AddStudentsGrade(id, grades));
  };

  const onAddGrede = (e, index) => {
    const newGrade = grades;
    newGrade[index].percent = parseInt(e.target.value);
    setGrade([...newGrade]);
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
        <Typography variant="h6" component="p">
          Students grades:
        </Typography>
      </div>

      <Grid container className={classes.root} spacing={2}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">NID</TableCell>
                <TableCell align="left">Grade "Percentage"</TableCell>
                <TableCell align="center" colSpan={2}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                !isEmpty(courses) &&
                courses.map((course, index) => (
                  <TableRow key={course.student._id}>
                    <TableCell align="left">
                      {course.student.fullNameEn}
                    </TableCell>
                    <TableCell align="left">{course.student.nid}</TableCell>
                    <TableCell align="left">
                      {course.grade.percent == null
                        ? "Not Found"
                        : `${course.grade.percent}%`}
                    </TableCell>

                    <TableCell align="left">
                      <TextField
                        id="standard-basic"
                        id={`${course.student._id}`}
                        name={`${course.student._id}`}
                        onChange={(e) => onAddGrede(e, index)}
                        label="Add Grade"
                        type="number"
                        value={grades[index]?.percent && grades[index].percent}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 3);
                        }}
                      />
                    </TableCell>

                    {/* <TableCell align="left">
                      <Button
                        onClick={() => addCourseGrade(course.student._id)}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {!isLoading && (
        <div className={classes.studentContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit(id)}
            style={{ marginTop: "2rem" }}
          >
            Submit
          </Button>
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </Layout>
  );
}

export default ShowCourseStudents;
