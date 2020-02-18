// Dependencies
import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import NavBar from "./NavBar";

// CSS/SASS
import "./sass/LoginPage.scss";

/**
 * Purpose: This is a file containing the login page of the ProjectWixs front-end. It documents basic layout and functionality of the login page.
 */
function LoginPage() {
  return (
    <div>
      <NavBar />
      <Container>
        <div className="word-content">
          <h1>Login Page</h1>
        </div>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email here." />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password here."
            />
          </Form.Group>
          <Button variant="primary" type="submit">
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

export default LoginPage;
