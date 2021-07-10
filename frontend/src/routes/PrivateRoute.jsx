import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { LoadUser } from "../redux/actions/userAction";
import { withRouter } from "react-router-dom";
function PrivateRoute({ component: Component, isAdmin, onlyUsers, ...rest }) {
  const history = useHistory();
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userState || Object.keys(userState).length === 0) {
      dispatch(LoadUser());
    } else if (
      (isAdmin && userState.role !== "admin") ||
      (onlyUsers && userState.role === "admin")
    ) {
      history.push("/");
    }
  }, [userState, isAdmin, LoadUser, history, onlyUsers]);

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

export default withRouter(PrivateRoute);
