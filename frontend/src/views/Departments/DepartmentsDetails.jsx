import { Chip, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Layout } from "../../container";
import { LoadDepartment } from "../../redux/actions/departmentAction";
// import { LoadSemester } from "../../redux/actions/semesterAction";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  studentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "10px",
  },
}));

function DepartmentsDetails() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(null);

  const { name, subjects, _id } = useSelector(
    (state) => state.department.department
  );
  const isLoading = useSelector((state) => state.department.isLoading);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(LoadDepartment(id));
  }, [id, LoadDepartment, dispatch]);

  // const confirmDeleteCourse = (id, courseId) => {
  //   window.confirm("Are You Sure?") && dispatch(DeleteDepartment(id, courseId));
  // };

  // const onCoursesSearch = (e) => {
  //   e.preventDefault();

  //   setSearch(e.target.value);

  //   if (counter) {
  //     clearTimeout(counter);
  //   }
  //   setCounter(
  //     setTimeout(() => {
  //       dispatch(LoadSemester("current", e.target.value));
  //     }, 500)
  //   );
  // };

  return (
    <Layout>
      {!isLoading && subjects && (
        <div className={classes.studentContainer}>
          <div>
            <Typography variant="h6" component="p">
              Department Name: {name}
            </Typography>
            <Typography variant="h6" component="p"></Typography>
          </div>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Code</TableCell>
              <TableCell align="left">title</TableCell>
              <TableCell align="left">level</TableCell>
              <TableCell align="left">type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              subjects &&
              subjects.map((subject) => (
                <TableRow key={subject._id}>
                  <TableCell align="left">{subject.subject.code}</TableCell>
                  <TableCell align="left">{subject.subject.title}</TableCell>
                  <TableCell align="left">{subject.level}</TableCell>
                  <TableCell align="left">{subject.type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </Layout>
  );
}

export default DepartmentsDetails;
