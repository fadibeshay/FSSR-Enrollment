import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import style from "./LogoutMenu.module.css";
import { connect } from "react-redux";
import { LogoutUser } from "../../redux/actions/userAction";
import { Redirect } from "react-router";

function LogoutMenu({ user, LogoutUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    LogoutUser();
    handleClose();
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={style.logoutBtn}
      >
        {user && <span>{user.name}</span>}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { LogoutUser })(LogoutMenu);
