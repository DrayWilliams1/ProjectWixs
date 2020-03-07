// Dependencies
import React from "react";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// CSS/SASS
import "./sass/Footer.scss";

/**
 * Purpose: This is a file containing the shared footer of the website
 */
function Footer() {
  return (
    <div>
      <Navbar
        className="footerContainer"
        variant="dark"
        bg="dark"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text>©2020 Project Wixs</Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
            <Button
              className="ButtonSecondary "
              href="#/help"
              variant="secondary"
            >
              Need help?
            </Button>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Footer;
