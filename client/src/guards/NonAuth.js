import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthTopBar from "../components/TopBar/TopBar";

const NonAuth = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('accessToken') ? (
        <>
        <AuthTopBar />
        <Component {...props} />
      </>) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default NonAuth;
