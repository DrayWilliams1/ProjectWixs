// Dependencies
import React from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button'


// CSS/SASS
import "./sass/Footer.scss";

/**
 * Purpose: This is a file containing the shared navigation bar of the website
 */
function Footer() {
  return (
    <div>
      <Navbar
        className="navContainer"
        variant="dark"
        bg="dark"
        expand="lg"
        sticky="bottom"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text>
            ©2020 Project Wixs
          </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
          <Button className="ButtonSecondary "href="#/help" variant="secondary">Need help?</Button>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Footer;
