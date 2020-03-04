// Dependencies
import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Assets
import logo from "./assets/logo-v6.png";

// CSS/SASS
import "./sass/NavBar.scss";

/**
 * Purpose: This is a file containing the shared navigation bar of the website
 */
export default class NavBar extends Component {
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

  logoutUser() {
    this.eraseCookie("user");
    this.eraseCookie("usid");

    window.alert("User has been signed out -- locally");
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
            <Nav className="ml-auto">
              <Button variant="secondary" onClick={this.logoutUser}>
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
