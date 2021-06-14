import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../container";
import { useSelector, useDispatch } from "react-redux";
import {
  LoadEnrollmentById,
  DeleteDepartment,
  ApproveEnrollment,
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

function EnrollmentsDetails() {
  const classes = useStyles();
  const { courses, student, isApproved, _id } = useSelector(
    (state) => state.enrollment.enrollment
  );
  const isLoading = useSelector((state) => state.enrollment.isLoading);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(LoadEnrollmentById(id));
  }, [id, LoadEnrollmentById]);

  const approveEnrollment = (id, data) => {
    dispatch(ApproveEnrollment(id, { isApproved: data }));
  };
  const confirmDeleteCourse = (id, courseId) => {
    window.confirm("Are You Sure?") && dispatch(DeleteDepartment(id, courseId));
  };

  return (
    <Layout>
      {!isLoading && student && (
        <div className={classes.studentContainer}>
          <div>
            <Typography variant="h6" component="p">
              Student Name: {student.fullNameEn}
            </Typography>
            <Typography variant="h6" component="p">
              Student National ID: {student.nid}
            </Typography>
          </div>

          <div>
            {isApproved ? (
              <Chip label="Approved" color="primary" />
            ) : (
              <Chip label="Not Approved" color="secondary" />
            )}

            <FormControlLabel
              style={{ marginLeft: "10px" }}
              control={
                <Checkbox
                  checked={isApproved}
                  onClick={() => approveEnrollment(_id, !isApproved)}
                  color="primary"
                />
              }
              label="Approved"
            />
          </div>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Code</TableCell>
              <TableCell align="left">title</TableCell>
              <TableCell align="left">instructor</TableCell>
              <TableCell align="center" colSpan={2}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              courses &&
              courses.map((enroll) => (
                <TableRow key={enroll._id}>
                  <TableCell align="left">{enroll.subject.code}</TableCell>
                  <TableCell align="left">{enroll.subject.title}</TableCell>
                  <TableCell align="left">{enroll.instructor}</TableCell>

                  <TableCell align="left">
                    <Button onClick={() => confirmDeleteCourse(id, enroll._id)}>
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

export default EnrollmentsDetails;
