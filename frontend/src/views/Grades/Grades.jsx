import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../container";
import { GetStudentsGrades } from "../../redux/actions/coursesAction";

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

function Grades() {
  const classes = useStyles();
  const { courses, semester } = useSelector((state) => state.course.course);
  const isLoading = useSelector((state) => state.course.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetStudentsGrades());
  }, [GetStudentsGrades]);

  return (
    <Layout>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        {!isLoading && semester && (
          <>
            <Typography variant="h6" component="p">
              Year: {semester.acadYear.year}
            </Typography>
            <Typography variant="h6" component="p">
              Semester: {semester.name}
            </Typography>
          </>
        )}
      </div>

      <Grid container className={classes.root} spacing={2}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">code</TableCell>
                <TableCell align="left">title</TableCell>
                <TableCell align="left">percent</TableCell>
                <TableCell align="left">letter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                courses &&
                courses.map((course, index) => (
                  <TableRow key={course._id}>
                    <TableCell align="left">{course.subject.code}</TableCell>
                    <TableCell align="left">{course.subject.title}</TableCell>
                    <TableCell align="left">
                      {course.percent == null
                        ? "Not Found"
                        : `${course.percent}%`}
                    </TableCell>
                    <TableCell align="left">{course.letter}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </Layout>
  );
}

export default Grades;
