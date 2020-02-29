// Dependencies
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// Assets
import logo from "./assets/logo-v6.png";
import pbIcon from "./assets/plasticBottleIcon.png";
import batteryIcon from "./assets/batteryIcon.png";

// CSS/SASS
import "./sass/HomePage.scss";

/**
 * Purpose: This is a file containing the landing of the ProjectWixs front-end. It documents basic
 * layout and functionality of the home page.
 */
function HomePage() {
  return (
    <div>
      <div className={"homePageGrid"}>
        <img src={logo} className={"homeLogo"} />

        {/*CARDS*/}
        <Card
          style={{ gridArea: "content1", margin: "15px" }}
          border="secondary"
        >
          <Card.Body>
            <Card.Img variant="top" src={pbIcon} />
            <Card.Title>Product Feature 1</Card.Title>
            <Card.Text>
              Lorem ipsum text for product feature 1Lorem ipsum text for product
              feature 1Lorem ipsum text for product feature 1Lorem ipsum text
              for product feature 1Lorem ipsum text for product feature 1Lorem
              ipsum text for product feature 1
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{ gridArea: "content2", margin: "15px" }}
          border="secondary"
        >
          <Card.Body>
            <Card.Img variant="top" src={pbIcon} />
            <Card.Title>Product Feature 2</Card.Title>
            <Card.Text>
              Lorem ipsum text for product feature 1Lorem ipsum text for product
              feature 1Lorem ipsum text for product feature 1Lorem ipsum text
              for product feature 1Lorem ipsum text for product feature 1Lorem
              ipsum text for product feature 2
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{ gridArea: "content3", margin: "15px" }}
          border="secondary"
        >
          <Card.Body>
            <Card.Img variant="top" src={pbIcon} />
            <Card.Title>Product Feature 3</Card.Title>
            <Card.Text>
              Lorem ipsum text for product feature 1Lorem ipsum text for product
              feature 1Lorem ipsum text for product feature 1Lorem ipsum text
              for product feature 1Lorem ipsum text for product feature 1Lorem
              ipsum text for product feature 3
            </Card.Text>
          </Card.Body>
        </Card>

        <div className={"loginORregister"}>
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <p>Or</p>
          <Link to="/register">
            <Button variant="secondary">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
