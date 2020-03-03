import React, { Component } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

// CSS/SASS
import "./sass/AdminPage.scss";

/**
 * Purpose: This is a file containing the registration page of the ProjectWixs front-end.
 * It documents basic layout and functionality of the registration page.
 *
 * -- Additional Notes --
 * - Note that this is a React class component and not a functional component. This is so
 *  the component can store and set state. Functional components are basically stateless.
 *
 * - React does not always need colons to finish lines so thats why some lines are missing them
 */
export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <div>
        <Container>
          <div className="word-content">
            <h1>Admin Page --</h1>
          </div>
        </Container>
      </div>
    );
  }
}
