import React from "react";
import { Route, Redirect } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";

const GuardAuth = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('accessToken') ? (
        <>
          <TopBar />
          <Component {...props} />
        </>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default GuardAuth;
