import React, { useEffect } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { Layout } from "../container";
import "../App.css";
import PeopleIcon from "@material-ui/icons/People";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ScheduleIcon from "@material-ui/icons/Schedule";

import { connect } from "react-redux";
import { LoadStudents } from "../redux/actions/studentAction";
import { LoadSubjects } from "../redux/actions/subjectAction";
import { LoadDepartments } from "../redux/actions/departmentAction";
import { LoadCurrentSemester } from "../redux/actions/semesterAction";
import Moment from "react-moment";
function Home({
  LoadStudents,
  LoadDepartments,
  LoadSubjects,
  LoadCurrentSemester,
  students,
  departments,
  subjects,
  currentSemester,
}) {
  useEffect(() => {
    LoadStudents();
    LoadDepartments();
    LoadSubjects();
    LoadCurrentSemester();
  }, []);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  return (
    <Layout>
      <Typography variant="h2" component="h2" color="textPrimary">
        Welcome in FSSR Enrollment System
      </Typography>
      <Typography
        variant="h5"
        component="h5"
        color="textSecondary"
        style={{
          marginBottom: "1rem",
        }}
      >
        Some Facts about our college
      </Typography>
      {!isEmpty(students) &&
        !isEmpty(subjects) &&
        !isEmpty(departments) &&
        !isEmpty(currentSemester) && (
          <Grid container spacing={2}>
            <Grid item xs={6} className="numberContainer">
              <PeopleIcon />
              <h4>{students.length}</h4>
              <Typography variant="h6" component="h5" color="textSecondary">
                Number Of Students
              </Typography>
            </Grid>
            <Grid item xs={6} className="numberContainer">
              <AccountBalanceIcon />
              <h4>{departments.length}</h4>
              <Typography variant="h6" component="h5" color="textSecondary">
                Number Of Departments
              </Typography>
            </Grid>

            <Grid item xs={6} className="numberContainer">
              <MenuBookIcon />
              <h4>{subjects.length}</h4>

              <Typography variant="h6" component="h5" color="textSecondary">
                Number Of Subjects
              </Typography>
            </Grid>

            <Grid item xs={6} className="numberContainer">
              <ScheduleIcon />
              <h5>
                Name : {currentSemester.name}
                <br />
                Start Date{" "}
                <Moment format="YYYY/MM/DD">{currentSemester.startDate}</Moment>
                <br />
                End Date :{" "}
                <Moment format="YYYY/MM/DD">{currentSemester.endDate}</Moment>
              </h5>
              <Typography variant="h6" component="h5" color="textSecondary">
                Current Semester
              </Typography>
            </Grid>
          </Grid>
        )}

      {isEmpty(students) && isEmpty(subjects) && isEmpty(departments) && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  students: state.student.students,
  subjects: state.subject.subjects,
  departments: state.department.departments,
  currentSemester: state.semester.currentSemester,
});

export default connect(mapStateToProps, {
  LoadStudents,
  LoadDepartments,
  LoadSubjects,
  LoadCurrentSemester,
})(Home);
