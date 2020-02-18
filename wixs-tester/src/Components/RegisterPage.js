// Dependencies
import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import NavBar from "./NavBar";

// CSS/SASS
import "./sass/RegisterPage.scss";

/**
 * Purpose: This is a file containing the registration page of the ProjectWixs front-end. It documents basic layout and functionality of the registration page.
 */
function RegisterPage() {
  return (
    <div>
      <NavBar />
      <Container>
        <div className="word-content">
          <h1>Registration Page</h1>
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
          <Button variant="warning" type="submit">
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

export default RegisterPage;
