import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Checkbox,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { LoadAdminEnrollments } from "../../redux/actions/enrollmentsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  inputContainer: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 250,
    marginBottom: "10px",
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
  CardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10px",
  },
}));

function AdminEnrollments() {
  const classes = useStyles();
  const enrollments = useSelector((state) => state.enrollment.enrollments);
  const isLoading = useSelector((state) => state.enrollment.isLoading);
  const [search, setSearch] = useState("");
  const [checkedState, setCheckedState] = useState(
    new Array(enrollments.length).fill(false)
  );

  const onEnrollmentsSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(LoadAdminEnrollments(search));
  };

  const getEnrollmentIds = (ids, idx) => {
    console.log("id :>> ", ids);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === idx ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    dispatch(LoadAdminEnrollments());
  }, [LoadAdminEnrollments]);

  const dispatch = useDispatch();
  return (
    <div>
      <Paper component="form" className={classes.inputContainer}>
        <InputBase
          className={classes.input}
          placeholder="Search Enrollments"
          inputProps={{ "aria-label": "Search Enrollments" }}
          onChange={onEnrollmentsSearch}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={onEnrollmentsSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Grid container className={classes.root} spacing={2}>
        {!isLoading &&
          enrollments.map((enrollment, idx) => (
            <Grid item md={4} key={enrollment._id}>
              <Card className={classes.root}>
                <Link
                  to={`/enrollments/show/${enrollment._id}`}
                  style={{
                    color: "rgba(0, 0, 0, 0.87)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="p"
                      color="textSecondary"
                    >
                      {enrollment.student.fullNameEn}
                    </Typography>
                    <Typography variant="p" component="p">
                      Number of Enrollment Courses : {enrollment.courses.length}
                    </Typography>
                    <Typography variant="p" component="p">
                      Level : {enrollment.__v}
                    </Typography>

                    <div className={classes.CardBottom}>
                      <div>Request Status :</div>

                      {enrollment.isApproved ? (
                        <Chip label="Approved" color="primary" />
                      ) : (
                        <Chip label="Not Approved" color="secondary" />
                      )}
                    </div>
                  </CardContent>
                </Link>

                {!enrollment.isApproved && (
                  <CardActions>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedState[idx]}
                          // onChange={handleCheckedChange}
                          onClick={() => getEnrollmentIds(enrollment._id, idx)}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Approved"
                    />
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
      </Grid>

      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress disableShrink />
        </div>
      )}
    </div>
  );
}

export default AdminEnrollments;
