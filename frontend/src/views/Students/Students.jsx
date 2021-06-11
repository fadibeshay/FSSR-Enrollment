import React, { useEffect, useState } from "react";
import { Layout } from "../../container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import style from "./Students.module.css";
import { connect } from "react-redux";
import { LoadStudents, DeleteStudent } from "../../redux/actions/studentAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function Students({ students, DeleteStudent, LoadStudents, isLoading }) {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const confirmDeleteStudent = (id) => {
    window.confirm("Are You Sure?") && DeleteStudent(id);
  };

  useEffect(() => {
    LoadStudents();
  }, []);

  const onStudentsSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    LoadStudents(search);
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
          <Link type="link" className={style.addBtn} to={"/students/add"}>
            Add Student
          </Link>
        </Button>

        <Paper component="form" className={classes.inputContainer}>
          <InputBase
            className={classes.input}
            placeholder="Search Students"
            inputProps={{ "aria-label": "Search Students" }}
            onChange={onStudentsSearch}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={onStudentsSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">National ID</TableCell>
              <TableCell align="left">Department</TableCell>
              <TableCell align="left">Level</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="center" colSpan={2}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell align="left">{student.fullNameEn}</TableCell>
                  <TableCell align="left">{student.nid}</TableCell>
                  <TableCell align="left">{student.major.name}</TableCell>
                  <TableCell align="left">{student.level}</TableCell>
                  <TableCell align="left">{student.phoneNumber}</TableCell>
                  <TableCell align="left">
                    <Button>
                      <Link
                        to={`/students/add/${student._id}`}
                        style={{
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        <EditIcon />
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => confirmDeleteStudent(student._id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
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

const mapStateToProps = (state) => ({
  students: state.student.students,
  isLoading: state.student.isLoading,
});

export default connect(mapStateToProps, { LoadStudents, DeleteStudent })(
  Students
);
