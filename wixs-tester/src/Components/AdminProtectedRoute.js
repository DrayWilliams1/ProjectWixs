// Dependencies
import React from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "/auth.js";

/**
 * Checks that user is a verified admin before allowing them access (or rendering) the component sent to
 * the admin protected route, where features exist that should only be accessible by admins.
 * Otherwise, user is redirected to homepage.
 *
 * @param {*} param0
 */
function AdminProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated() && auth.isAdmin()) { 
          //user is authenticated and is an admin
          return <Component {...props} />;
        } else {
          // user not a verified admin
          return (
            <Redirect
              to={{
                pathname: "/", //redirect to homepage
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

export default AdminProtectedRoute; 