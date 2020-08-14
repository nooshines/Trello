import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function Navbar(props) {
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

  return (
    <div className="navbar bg-primary">
      <h2>
        <i className="fa fa-trello" aria-hidden="true" />
        Trello
      </h2>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
}

export default Navbar;
