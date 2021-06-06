import React from "react";
import { StudentsChart } from "../components";
import { Layout } from "../container";

function Home() {
  return (
    <Layout>
      <h1>Welcome in FSSR Enrollment System</h1>

      <div>
        <StudentsChart />
      </div>
    </Layout>
  );
}

export default Home;
