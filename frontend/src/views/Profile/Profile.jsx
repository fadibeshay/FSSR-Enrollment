import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "../../container";
import { LoadStudent } from "../../redux/actions/studentAction";

function Profile({ user, student, LoadStudent }) {
  useEffect(() => {
    if (user._id) {
      LoadStudent(user._id);
    }
  }, []);
  return (
    <Layout>
      <h1>Hello {user.name} </h1>

      {student && student.name}
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  student: state.student.student,
});

export default connect(mapStateToProps, { LoadStudent })(Profile);
