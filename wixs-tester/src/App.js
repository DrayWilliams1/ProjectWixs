// Dependencies
import React from "react";
import { HashRouter as HRouter, Route, Switch } from "react-router-dom";

// Components
import HomePage from "./components/HomePage.js";
import AboutPage from "./components/AboutPage.js";
import NullPage from "./components/NullPage.js";
import HelpPage from "./components/HelpPage.js";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import DashboardPage from "./components/DashboardPage.js";
import AdminPage from "./components/AdminPage.js";

// CSS/SASS
import "./App.scss";
import NavBar from "./Components/NavBar";

/**
 * Purpose: This is a base file for the ProjectWixs application and helps with page routing and shared
 * features/design amongst pages.
 *
 * -- Additional Notes --
 * - By React rules, all rendered components must be contained within a single <div> component
 */
function App() {
  return (
    <div className="App">
      <HRouter basename={process.env.PUBLIC_URL}>
        {/*This places the navbar above every page*/}
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />{" "}
          {/* Routes to the home page */}
          <Route exact path="/about" component={AboutPage} />{" "}
          {/* Routes to the about page */}
          <Route exact path="/help" component={HelpPage} />{" "}
          {/* Routes to the help/tutorial page */}
          <Route exact path="/register" component={RegisterPage} />{" "}
          {/* Routes to the user registration page */}
          <Route exact path="/login" component={LoginPage} />{" "}
          {/* Routes to the login page */}
          <Route exact path="/dashboard" component={DashboardPage} />{" "}
          {/* Routes to the user dashboard/template select page */}
          <Route exact path="/admin" component={AdminPage} />{" "}
          {/* Routes to the administrator's site info page */}
          <Route path="*" component={NullPage} />{" "}
          {/* Routes to a 404 page. A catch-all for any pages not existing on the server or in the application. */}
        </Switch>
      </HRouter>
    </div>
  );
}

export default App;
