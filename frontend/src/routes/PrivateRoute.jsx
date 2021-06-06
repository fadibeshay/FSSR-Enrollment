import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { LoadUser } from "../redux/actions/userAction";
function PrivateRoute({
  component: Component,
  LoadUser,
  userState,
  isAdmin,
  ...rest
}) {
  const history = useHistory();

  useEffect(() => {
    getAndRedirectUser();
  }, []);

  const getAndRedirectUser = async () => {
    if (Object.keys(userState).length == "") {
      await LoadUser();
      await ifUserAdmin();
    }
  };

  const ifUserAdmin = () => {
    if (
      isAdmin &&
      Object.keys(userState).length !== "" &&
      userState.role !== "admin"
    ) {
      history.push("/");
    }
  };

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
