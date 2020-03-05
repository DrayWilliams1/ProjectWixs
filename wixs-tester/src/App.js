// Dependencies
import React, { Component } from "react";
import {
  HashRouter as HRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

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
import Footer from "./components/Footer";

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
      usid: "", // user session identifier
      loggedIn: false
    };

    // Binds React class component methods
    this.setCookie = this.setCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.eraseCookie = this.eraseCookie.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  // TODO: possible creation of a cookie class that can be referenced from each file instead of copy-pasting each function
  /**
   * Allows for the creation of a cookie
   *
   * @param {*} name the name of the cookie to be created
   * @param {*} value the value for which the cookie will contain
   * @param {*} days the number of days until the cookie expires
   */
  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log("Cookie created");
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
   * Allows for the deletion of a cookie
   *
   * @param {*} name the name of the cookie to be deleted
   */
  eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  /**
   *
   */
  getCurrentUser() {
    var currentUser = this.getCookie("user");

    if (currentUser) {
      return currentUser;
    } else {
      return "Not currently signed in.";
    }
  }

  /**
   * Checks if the user is logged in and will display necessary info or redirect
   * pages accordingly
   */
  isLoggedIn() {
    var currentUser = this.getCookie("user");
    var currentSession = this.getCookie("usid");

    if (currentUser && currentSession) {
      // checks that the cookie fields are not empty
      this.setState({
        // updates state so it can be passed as props to child components (Subpages and other components)
        email: currentUser,
        usid: currentSession
      });
      return true; // user is logged in
    }
    return false; // user not logged in
  }

  componentDidMount() {
    if (this.isLoggedIn()) {
      this.setState({
        loggedIn: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <HRouter basename={process.env.PUBLIC_URL}>
          {/*This places the navbar above every page*/}
          <NavBar currentUser={this.getCurrentUser()} />
          <Switch>
            {/* Routes to the home page */}
            <Route exact path="/" component={HomePage} />{" "}
            {/* Routes to the about page */}
            <Route exact path="/about" component={AboutPage} />{" "}
            {/* Routes to the help/tutorial page */}
            <Route exact path="/help" component={HelpPage} />{" "}
            {/* Routes to the user registration page */}
            <Route exact path="/register" component={RegisterPage} />{" "}
            {/* Routes to the login page */}
            <Route
              exact
              path="/login"
              render={() =>
                this.state.loggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <LoginPage />
                )
              }
            />
            {/* Routes to the user dashboard/template select page */}
            <Route
              exact
              path="/dashboard"
              render={() =>
                this.state.loggedIn ? (
                  <DashboardPage />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            {/* Routes to the administrator's site info page */}
            <Route exact path="/admin" component={AdminPage} />{" "}
            {/* Routes to a 404 page. A catch-all for any pages not existing on the server or in the application. */}
            <Route path="*" component={NullPage} />{" "}
          </Switch>
        {/* This places the footer at the end of every page */}
          <Footer />
        </HRouter>
      </div>
    );
  }
}
