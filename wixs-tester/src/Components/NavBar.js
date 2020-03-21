// Dependencies
import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Button,
  ButtonToolbar,
  ButtonGroup
} from "react-bootstrap";
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
const CHECK_IS_ADMIN =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/isAdmin.php";

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

    //const isAuthenticated = auth.isAuthenticated();
    //const isAdmin = auth.isAdmin();

    this.state = {
      isAuthenticated: false,
      isAdmin: false
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
  }

  /**
   * Performs logout operation for the user. Removes user details from cookies and deletes session_id from database
   *
   * @param {*} event the event that launched the function
   */
  logoutUser(event) {
    event.preventDefault();

    var currentUser = auth.getCookie("user");
    var currentSession = auth.getCookie("usid");

    if (currentUser && currentSession) {
      // checks that cookie fields are not empty
      const params = {
        email: currentUser
      };

      axios
        .post(LOGOUT_USER_URL, qs.stringify(params))
        .then(response => {
          console.log(response);

          if (response.data["success"] === true) {
            // successful user logout
            auth.eraseCookie("user"); // erases user email from cookies
            auth.eraseCookie("usid"); // erases user session id from cookies

            window.alert(response.data["message"]);

            this.props.history.push("/"); // redirects to the landing page
          } else {
            window.alert(response.data["message"]);
          }
        })
        .catch(error => {
          console.log(error);
        });

      return true;
    }
  }

  /**
   * Returns whether the currently signed in user has administrator permissions
   *
   * @return boolean true if the user is an admin, false if not
   */
  isAdmin() {
    var currentUser = auth.getCookie("user");

    if (currentUser) {
      const params = {
        email: currentUser
      };

      axios
        .post(CHECK_IS_ADMIN, qs.stringify(params))
        .then(response => {
          console.log(response);

          if (response.data["success"] === true) {
            // script success
            if (response.data["isAdmin"] === true) {
              // user is an admin
              this.setState({
                isAdmin: true
              });
            } else {
              // user is not an admin
              this.setState({
                isAdmin: false
              });
            }
          } else {
            // script failure
            console.log(response.data["message"]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    const isAuthenticated = auth.isAuthenticated();
    //const isAdmin = auth.isAdmin();

    if (isAuthenticated) {
      this.setState({
        isAuthenticated: true
      });
    }

    this.isAdmin();
    /*this.setState({
      isAdmin: true
    });*/

    /*if(this.isAdmin()) {
      this.setState({
        isAdmin: true
      });
    }*/
  }

  render() {
    let buttons;

    if (this.state.isAuthenticated) {
      if (this.state.isAdmin) {
        buttons = (
          <div>
            <Navbar.Text>
              <span id="admin-option">
                <a href="#/admin">Admin Options</a>
              </span>
            </Navbar.Text>
            <Button
              id="logout-button"
              variant="secondary"
              onClick={this.logoutUser}
              size="sm"
            >
              Logout
            </Button>
            <Navbar.Text>
              Signed in as:{" "}
              <span>
                <a id="userEmail" href="#/dashboard">
                  {this.props.currentUser}
                </a>
              </span>
            </Navbar.Text>
          </div>
        );
      } else {
        // display logout button
        buttons = (
          <div>
            <Button
              id="logout-button"
              variant="secondary"
              onClick={this.logoutUser}
              size="sm"
            >
              Logout
            </Button>
            <Navbar.Text>
              Signed in as:{" "}
              <span>
                <a id="userEmail" href="#/dashboard">
                  {this.props.currentUser}
                </a>
              </span>
            </Navbar.Text>
          </div>
        );
      }
    } else {
      // display login and register buttons
      buttons = (
        <div>
          <ButtonToolbar aria-label="Login and logout buttons">
            <ButtonGroup className="px-2" aria-label="Login button">
              <Button variant="primary" href={"#/login"}>
                Login
              </Button>
            </ButtonGroup>
            {/* <Navbar.Text> </Navbar.Text> */}
            <ButtonGroup className="px-2" aria-label="Logout button">
              <Button variant="warning" href={"#/register"}>
                Register
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      );
    }

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
            {/*
            <NavLink
              to="/admin"
              className="navLink-normal mr-sm-2"
              activeClassName="navLink-selected"
            >
               Will possibly change this to activeClassName when using css file
              Admin Options
            </NavLink> */}
            <NavLink
              to="/upload"
              className="navLink-normal mr-sm-2"
              activeClassName="navLink-selected"
            >
              {/* Will possibly change this to activeClassName when using css file */}
              Upload
            </NavLink>
            <Nav className="ml-auto ">{buttons}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
