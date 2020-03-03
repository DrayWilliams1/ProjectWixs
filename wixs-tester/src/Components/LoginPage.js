import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import qs from "qs";

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
      loggedIn: false
    };

    // Binds React class component methods
    this.emailChanged = this.emailChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates the component state to reflect the user email currently in the input field
  emailChanged(e) {
    this.setState({
      email: e.target.value,
      status: "" // resets status to empty once typing is started
    });
  }

  // Updates the component state to reflect the user password currently in the input field
  passwordChanged(e) {
    this.setState({
      password: e.target.value,
      status: "" // resets status once typing is started
    });
  }

  // Checks whether each input field has been filled out
  // TODO: password matching for both password fields
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

      // could also update status here if we wanted to display it on page after
      this.setState({
        status: "Password field must be filled out"
      });

      return false;
    }
    return true;
  }

  // Submits the input details to the PHP script using axios' HTTP POST request
  handleSubmit(event) {
    event.preventDefault();

    if (this.inputsValidated()) {
      // if no inputs are empty upon button click
      // setting params for axios form submission
      const params = {
        email: this.state.email,
        password: this.state.password
      };

      axios
        .post(LOGIN_USER_URL, qs.stringify(params))
        .then(response => {
          console.log(response);

          if (response.data["success"] === true) {
            window.alert("Sign in successful.");

            this.setState({
              // sets state to logged in so redirect can work
              loggedIn: true
            });
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

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
      // Will redirect to user dashboard once successfully logged in
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
