import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "/auth.js";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          // user is authenticated
          return <Component {...props} />;
        } else {
          // user not authenticated
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
