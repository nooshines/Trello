import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/auth/Login";
import ListsHome from "./components/list/ListsHome";
import Register from "./components/auth/Register";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
      <AuthState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <Alerts />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/About" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/board/:boardId" component={ListsHome} />
            </Switch>
          </BrowserRouter>
        </AlertState>
      </AuthState>
    </>
  );
}

export default App;
