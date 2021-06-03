import React, { useEffect } from "react";
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
import { LoadStudents } from "../../redux/actions/studentAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Students({ students, LoadStudents, isLoading }) {
  const classes = useStyles();

  const deleteStudent = (id) => {
    console.log("id :>> ", id);

    window.confirm("Are You Sure?") && alert("Hello");
  };

  useEffect(() => {
    LoadStudents();
  }, []);

  return (
    <Layout>
      <Button
        style={{ marginBottom: "10px" }}
        variant="contained"
        color="primary"
      >
        <Link type="link" className={style.addBtn} to={"/students/add"}>
          Add Student
        </Link>
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">fullNameEn</TableCell>
              <TableCell align="left">phoneNumber</TableCell>
              <TableCell align="left">department</TableCell>
              <TableCell align="left">gender</TableCell>
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
                  <TableCell align="left">{student.phoneNumber}</TableCell>
                  <TableCell align="left">{student.department}</TableCell>
                  <TableCell align="left">{student.gender}</TableCell>
                  <TableCell align="left">
                    <Button>
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => deleteStudent(student._id)}>
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

export default connect(mapStateToProps, { LoadStudents })(Students);
