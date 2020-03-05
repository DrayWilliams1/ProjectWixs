import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios"; // for AJAX call to PHP files
import qs from "qs"; // for packaging details collected from the form
import { v4 as uuidv4 } from "uuid"; // Will generate a uuid from cryptographically-strong random values

import auth from "/auth.js";

// CSS/SASS
import "./sass/LoginPage.scss";

const LOGIN_USER_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/loginUser.php";

/**
 * Purpose: This is a file containing the registration page of the ProjectWixs front-end.
 * It documents basic layout and functionality of the registration page.
 *
 * -- Additional Notes --
 * - Note that this is a React class component and not a functional component. This is so
 *  the component can store and set state. Functional components are basically stateless.
 *
 * - React does not always need colons to finish lines so thats why some lines are missing them
 *
 */
export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      usid: "", // user session identifier
      loggedIn: false
    };

    // Binds React class component methods
    this.emailChanged = this.emailChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.inputsValidated = this.inputsValidated.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.eraseCookie = this.eraseCookie.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    /*window.addEventListener("hashchange", function() {
      this.console.log("hash has changed");
    });*/
  }

  /**
   * Updates the component state to reflect the user email currently in the input field
   *
   * @param {*} e
   */
  emailChanged(e) {
    this.setState({
      email: e.target.value
    });
  }

  /**
   * Updates the component state to reflect the user password currently in the input field
   *
   * @param {*} e
   */
  passwordChanged(e) {
    this.setState({
      password: e.target.value
    });
  }

  /**
   * Checks whether each input field has been filled out and that password fields match
   */
  inputsValidated() {
    if (this.state.email === "") {
      // email field is empty
      alert("Email field must be filled out");

      // could also update status here if we wanted to display it on page after
      this.setState({
        status: "Email field must be filled out"
      });

      return false;
    }

    if (this.state.password === "") {
      // last name field is empty
      alert("Password field must be filled out");

      return false;
    }
    return true;
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
   * Submits the input details to the PHP script using axios' HTTP POST request
   *
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();

    // creating and setting unique user session id
    var usid = uuidv4();
    this.setState({
      usid: usid
    });

    if (this.inputsValidated()) {
      // if no inputs are empty upon button click
      // setting params for axios form submission
      const params = {
        email: this.state.email,
        password: this.state.password,
        usid: this.state.usid
      };

      axios
        .post(LOGIN_USER_URL, qs.stringify(params))
        .then(response => {
          console.log(response);

          if (response.data["success"] === true) {
            this.setCookie("usid", usid, 7);
            this.setCookie("user", this.state.email, 7);

            this.setState({
              loggedIn: true
            });

            //auth.login();

            window.alert("Sign in successful.");

            //this.props.history.push("/dashboard");
            window.location.href = "#/dashboard";
            //window.location.replace("#/dashboard"); // redirects to dashboard after login
          } else {
            window.alert(response.data["message"]);
          }

          // TODO: have a stylized React-Bootstrap alert component show details (maybe).
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  /**
   * Checks if the user is currently logged in
   */
  componentDidMount() {
    var currentUser = this.getCookie("user");
    var currentSession = this.getCookie("usid");

    if (currentUser && currentSession) {
      this.setState({
        loggedIn: true
      });
    }
  }

  render() {
    return (
      <div>
        <Container>
          <div className="word-content">
            <h1>Login Page</h1>
          </div>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>
                Email address <strong>(Required)</strong>
              </Form.Label>
              <Form.Control
                type="email"
                value={this.state.email}
                placeholder="Enter your email"
                onChange={this.emailChanged}
                maxLength="100"
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>
                Password <strong>(Required)</strong>
              </Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                placeholder="Enter your password"
                onChange={this.passwordChanged}
                maxLength="100"
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Login
            </Button>
          </Form>

          <p>
            Dont have an account? Sign up <Link to="/register">here</Link>
          </p>
        </Container>
      </div>
    );
  }
}
