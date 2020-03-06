// Dependencies
import React, { Component } from "react";
import { Container } from "react-bootstrap";

import auth from "/auth.js";

// CSS/SASS
import "./sass/DashboardPage.scss";

/**
 * Purpose: This is a file containing...
 */
export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first_name: ""
    };
  }

  render() {
    return (
      <div>
        <Container>
          <div className="word-content">
            <h1>Dashboard --</h1>
          </div>
        </Container>
      </div>
    );
  }
}
