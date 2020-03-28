// Dependencies
import React, { Component } from "react";
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
import UploadPage from "./components/UploadPage.js";

// Secure Route (can send multiple different components here)
import ProtectedRoute from "./components/ProtectedRoute.js";

// CSS/SASS
import "./App.scss";
import NavBar from "./Components/NavBar";
import Footer from "./components/Footer";
import Editor from "./Components/Editor/Editor";

/**
 * Purpose: This is a base file for the ProjectWixs application and helps with page routing and shared
 * features/design amongst pages.
 *
 * -- Additional Notes --
 * - By React rules, all rendered components must be contained within a single <div> component
 */
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      usid: "" // user session identifier
    };

    // Binds React class component methods
    this.getCookie = this.getCookie.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);

    window.addEventListener("hashchange", function() {
      this.window.location.reload(); // reloads page any time it notices the # in the URL has changed. Helps with keeping display data current
    });
  }

  /**
   * Allows for the retrieval of a cookie based on name
   *
   * @param {*} name
   */
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * Returns the current logged in user of the system. Displays it in the navbar component
   */
  getCurrentUser() {
    var currentUser = this.getCookie("user");

    if (currentUser) {
      return currentUser;
    } else {
      return "Not currently signed in.";
    }
  }

  render() {
    return (
      <div className="App">
        <HRouter basename={process.env.PUBLIC_URL}>
          {/*This places the navbar above every page*/}
          <NavBar currentUser={this.getCurrentUser()} />
          <div className="body">
            <Switch>
              {/* Routes to the home page */}
              <Route exact path="/" component={HomePage} />

              {/* Routes to the about page */}
              <Route exact path="/about" component={AboutPage} />

              {/* Routes to the help/tutorial page */}
              <Route exact path="/help" component={HelpPage} />

              {/* Routes to the user registration page */}
              <Route exact path="/register" component={RegisterPage} />

              {/* Routes to the login page */}
              <Route exact path="/login" component={LoginPage} />

              {/* Routes to the user dashboard/template select page */}
              <ProtectedRoute
                exact
                path="/dashboard"
                component={DashboardPage}
              />

              {/* Routes to the template editor page */}
              <ProtectedRoute exact path="/editor" component={Editor} />

              {/* Routes to the administrator's site info page */}
              <ProtectedRoute exact path="/admin" component={AdminPage} />

              {/* Routes to the user file upload page */}
              <ProtectedRoute exact path="/upload" component={UploadPage} />

              {/* Routes to a 404 page. A catch-all for any pages not existing on the server or in the application. */}
              <Route path="*" component={NullPage} />
            </Switch>
          </div>
          {/* This places the footer at the end of every page */}
          <Footer className="footerContainer" />
        </HRouter>
      </div>
    );
  }
}
