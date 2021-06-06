import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { StudentsChart } from "../components";
import { Layout } from "../container";

function Home() {
  return (
    <Layout>
      <Typography variant="h2" component="h2" color="textPrimary">
        Welcome in FSSR Enrollment System{" "}
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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" component="h5" color="textSecondary">
            Number Of Students
          </Typography>
          <StudentsChart />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" component="h5" color="textSecondary">
            Number Of Departments
          </Typography>
          <StudentsChart />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" component="h5" color="textSecondary">
            Number Of Subjects
          </Typography>
          <StudentsChart />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home;
