import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
});

function Navbar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li>
        {" "}
        <strong>Welcome {user && user.name}</strong>
      </li>
      <li>
        <a onClick={onLogout} href="/login">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">
            <strong>Logout</strong>
          </span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        {" "}
        <Link to="/about">
          <strong>About</strong>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <strong>Register</strong>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <strong>Login</strong>
        </Link>
      </li>
    </>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          "About this Board",
          "Change Background",
          "Search Cards",
          "...More",
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All Activity"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="navbar bg-primary">
      <h2>
        <i className="fa fa-trello" aria-hidden="true" />
        Trello
      </h2>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              style={{ color: "white" }}
            >
              Menu
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
