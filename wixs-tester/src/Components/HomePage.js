// Dependencies
import React from "react";
import { Container, Button, Card, CardColumns } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import NavBar from "./NavBar";

// Assets
import logo from "./assets/logo-v6.png";
import pbIcon from "./assets/plasticBottleIcon.png";
import batteryIcon from "./assets/batteryIcon.png";

// CSS/SASS
import "./sass/HomePage.scss";

/**
 * Purpose: This is a file containing the landing of the ProjectWixs front-end. It documents basic layout and functionality of the home page.
 */
function HomePage() {
  return (
    <div>
      <NavBar />
      <Container>
        <img src={logo} width="300" height="300" />
        We've got the CMS to beat, what else did you expect?
      </Container>

      <Container>
        <CardColumns>
          <Card style={{ width: "18rem" }} border="success">
            <Card.Body>
              <Card.Img variant="top" src={pbIcon} />
              <Card.Title>Product Feature 1</Card.Title>
              <Card.Text>Lorem ipsum text for product feature 1</Card.Text>
              <Button variant="success">See Info</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} border="warning">
            <Card.Body>
              <Card.Img variant="top" src={batteryIcon} />
              <Card.Title>Product Feature 2</Card.Title>
              <Card.Text>Lorem ipsum text for product feature 2</Card.Text>
              <Button variant="success">See Info</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} border="info">
            <Card.Body>
              <Card.Img variant="top" src={batteryIcon} />
              <Card.Title>Product Feature 3</Card.Title>
              <Card.Text>Lorem ipsum text for product feature 3</Card.Text>
              <Button variant="success">See Info</Button>
            </Card.Body>
          </Card>
        </CardColumns>
      </Container>
      <Container>
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>

        <p>Or</p>
        <Link to="/register">
          <Button variant="warning">Register</Button>
        </Link>
      </Container>
    </div>
  );
}

export default HomePage;
