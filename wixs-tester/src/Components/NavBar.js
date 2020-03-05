// Dependencies
import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios"; // for AJAX call to PHP files
import qs from "qs"; // for packaging details collected from the form

import auth from "/auth.js";

// Assets
import logo from "./assets/logo-v6.png";

// CSS/SASS
import "./sass/NavBar.scss";

const LOGOUT_USER_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/logoutUser.php";

/**
 * Purpose: This is a file containing the shared navigation bar of the website
 *
 * -- Additional Notes --
 * - Component is wrapped in a withRouter because it is not nested under a <Route /> in the main App
 * file. In order to give the navbar access to props.history.push when the logout button is clicked
 * it must be wrapped in a withRouter upon component export
 */
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.setCookie = this.setCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.eraseCookie = this.eraseCookie.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
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

  logoutUser(event) {
    event.preventDefault();

    var currentUser = this.getCookie("user");
    var currentSession = this.getCookie("usid");

    if (currentUser && currentSession) {
      const params = {
        email: currentUser
      };

      axios
        .post(LOGOUT_USER_URL, qs.stringify(params))
        .then(response => {
          console.log(response);

          if (response.data["success"] === true) {
            // successful user logout
            this.eraseCookie("user"); // erases user email from cookies
            this.eraseCookie("usid"); // erases user session id from cookies

            //auth.logoutUser();

            window.alert(response.data["message"]);

            this.props.history.push("/");

            //window.location.replace("/"); // redirects to homepage after login
          } else {
            window.alert(response.data["message"]);
          }
        })
        .catch(error => {
          console.log(error);
        });

      return true;
      // checks that the cookie fields are not empty
    }
  }

  render() {
    return (
      <div>
        <Navbar
          className="navContainer"
          variant="dark"
          bg="dark"
          expand="lg"
          sticky="top"
        >
          <Navbar.Brand href="./">
            <img src={logo} width="50" height="50" />
            ProjectWixs v1.0.0
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLink
              to="/dashboard"
              className="navLink-normal"
              activeClassName="navLink-selected"
            >
              {/* Will possibly change this to activeClassName when using css file */}
              Dashboard
            </NavLink>
            <NavLink
              to="/editor"
              className="navLink-normal"
              activeClassName="navLink-selected"
            >
              {/* Will possibly change this to activeClassName when using css file */}
              Editor
            </NavLink>
            <NavLink
              to="/about"
              className="navLink-normal"
              activeClassName="navLink-selected"
            >
              {/* Will possibly change this to activeClassName when using css file */}
              About Us
            </NavLink>
            <NavLink
              to="/help"
              className="navLink-normal mr-sm-2"
              activeClassName="navLink-selected"
            >
              {/* Will possibly change this to activeClassName when using css file */}
              Help/FAQs
            </NavLink>
            <Nav className="ml-auto ">
              <Button variant="primary" href={"#/login"} size="sm">
                Login
              </Button>
              <Button variant="secondary" onClick={this.logoutUser} size="sm">
                Logout
              </Button>
              <Navbar.Text>
                Signed in as:{" "}
                <span id="userEmail">{this.props.currentUser}</span>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
