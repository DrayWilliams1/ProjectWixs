// Dependencies
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
      usid: "" // user session identifier
    };

    // Binds React class component methods
    this.emailChanged = this.emailChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.inputsValidated = this.inputsValidated.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Updates the component state to reflect the user email currently in the input field
   *
   * @param {*} e the event that launched the function
   */
  emailChanged(e) {
    this.setState({
      email: e.target.value
    });
  }

  /**
   * Updates the component state to reflect the user password currently in the input field
   *
   * @param {*} e the event that launched the function
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

      return false;
    }

    if (this.state.password === "") {
      // last name field is empty
      alert("Password field must be filled out");

      return false;
    }
    return true;
  }

  /**
   * Submits the input details to the PHP script using axios' HTTP POST request
   *
   * @param {*} event the event that launched the function
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
            auth.setCookie("usid", usid, 7);
            auth.setCookie("user", this.state.email, 7);

            window.alert("Sign in successful.");

            window.location.href = "#/dashboard"; // could use this or history push
          } else {
            window.alert(response.data["message"]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    if (auth.isAuthenticated()) {
      this.props.history.push("/dashboard"); // redirects to the dashboard if already registered
    }

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
