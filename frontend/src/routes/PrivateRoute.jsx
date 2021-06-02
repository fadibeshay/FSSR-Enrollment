import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { LoadUser } from "../redux/actions/userAction";
function PrivateRoute({ component: Component, LoadUser, userState, ...rest }) {
  useEffect(() => {
    if (Object.keys(userState).length == "") {
      LoadUser();
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => ({
  userState: state.user.user,
});

export default connect(mapStateToProps, { LoadUser })(PrivateRoute);
