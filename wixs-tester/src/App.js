// Dependencies
import React, { Component } from "react";
import { HashRouter as HRouter, Route, Switch } from "react-router-dom";
import auth from "/auth.js";
import axios from "axios";
import qs from "qs"; // for packaging details collected from the form

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

// Axios URLs
const GET_USER_URL = "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUser.php";

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

    // Binds React class component methods
    //this.getCookie = this.getCookie.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.checkCookieAuth = this.checkCookieAuth.bind(this);

    window.addEventListener("hashchange", function() {
      this.window.location.reload(); // reloads page any time it notices the # in the URL has changed. Helps with keeping display data current
    });
  }

  /**
   * Returns the current logged in user of the system. Displays it in the navbar component
   */
  getCurrentUser() {
    var currentUser = auth.getCookie("user");

    if (currentUser) {
      return currentUser;
    } else {
      return "Not currently signed in.";
    }
  }

  /**
   * Checks if the currently stored cookies reflect a user within the database
   */
  checkCookieAuth() {
    var currentUser = auth.getCookie("user");

    if (currentUser) {
      // if there is a user email stored in cookies
      const params = {
        email: currentUser
      };

      axios
        .post(GET_USER_URL, qs.stringify(params))
        .then(response => {
          console.log(response.data);

          if (response.data["success"] === false) {
            // A matching user does not exist in the database
            auth.eraseCookie("user"); // erases user email from cookies
            auth.eraseCookie("usid"); // erases user session id from cookies

            console.log("Cookies cleared");
            window.location.reload();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.checkCookieAuth();
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
