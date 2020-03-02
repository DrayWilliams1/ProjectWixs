// Dependencies
import React, { Component } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

// CSS/SASS
import "./sass/RegisterPage.scss";

const ADD_USER_URL = "http://cosc.brocku.ca/~c4f00g02/projectWixs/addUser.php";

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
export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      password: ""
    };

    // Binds React class component methods
    this.emailChanged = this.emailChanged.bind(this);
    this.firstNameChanged = this.firstNameChanged.bind(this);
    this.lastNameChanged = this.lastNameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates the component state to reflect the user email currently in the input field
  emailChanged(e) {
    this.setState({
      email: e.target.value,
      status: ""
    });
  }

  // Updates the component state to reflect the user first name currently in the input field
  firstNameChanged(e) {
    this.setState({
      first_name: e.target.value,
      status: ""
    });
  }

  // Updates the component state to reflect the user last name currently in the input field
  lastNameChanged(e) {
    this.setState({
      last_name: e.target.value,
      status: ""
    });
  }

  // Updates the component state to reflect the user password currently in the input field
  passwordChanged(e) {
    this.setState({
      password: e.target.value,
      status: ""
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

    if (this.state.first_name === "") {
      // first name field is empty
      alert("First name field must be filled out");

      // could also update status here if we wanted to display it on page after
      this.setState({
        status: "First name field must be filled out"
      });

      return false;
    }

    if (this.state.last_name === "") {
      // last name field is empty
      alert("Last name field must be filled out");

      // could also update status here if we wanted to display it on page after
      this.setState({
        status: "Last name field must be filled out"
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
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password
      };

      axios
        .post(ADD_USER_URL, qs.stringify(params))
        .then(response => {
          console.log(response);

          window.alert(response.data);
          //location.reload();
          // TODO: redirect to user dashboard and have a stylized React-Bootstrap alert component show details.
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <Container>
          <div className="word-content">
            <h1>Registration Page</h1>
            <p>Create new accounts for the ProjectWixs system</p>
          </div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGroupFirst">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.first_name}
                  placeholder="Enter your first name (max 50 characters)"
                  onChange={this.firstNameChanged}
                  maxLength="50"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGroupLast">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.last_name}
                  placeholder="Enter your last name (max 50 characters)"
                  onChange={this.lastNameChanged}
                  maxLength="50"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGroupEmail">
              <Form.Label>
                Email address <strong>(Required)</strong>
              </Form.Label>
              <Form.Control
                type="email"
                value={this.state.email}
                placeholder="Enter your email (max 100 characters)"
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
                placeholder="Enter your password (min 8/max 100 characters)"
                onChange={this.passwordChanged}
                maxLength="100"
              />
            </Form.Group>
            <Button variant="warning" type="submit" onClick={this.handleSubmit}>
              Create Account
            </Button>
          </Form>

          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </Container>
      </div>
    );
  }
}
