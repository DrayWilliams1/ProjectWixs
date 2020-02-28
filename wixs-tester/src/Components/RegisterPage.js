// Dependencies
import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components

// CSS/SASS
import "./sass/RegisterPage.scss";

/**
 * Purpose: This is a file containing the registration page of the ProjectWixs front-end. It documents basic layout and functionality of the registration page.
 */
function RegisterPage() {
  return (
    <div>
      <Container>
        <div className="word-content">
          <h1>Registration Page</h1>
        </div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupFirst">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your first name." />
            </Form.Group>
            <Form.Group as={Col} controlId="formGroupLast">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name." />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address (Required)</Form.Label>
            <Form.Control type="email" placeholder="Enter your email." />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password (Required)</Form.Label>
            <Form.Control type="password" placeholder="Enter your password." />
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
