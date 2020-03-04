// Dependencies
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Assets
import logo from "./assets/logo-v6.png";

// CSS/SASS
import "./sass/NavBar.scss";

/**
 * Purpose: This is a file containing the shared navigation bar of the website
 */
function NavBar(props) {
  return (
    <div>
      <Navbar
        className="navContainer"
        variant="dark"
        bg="dark"
        expand="lg"
        sticky="top"
      >
        <Navbar.Brand href="./">
          <img src={logo} width="50" height="50" />
          ProjectWixs v1.0.0
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink
            to="/about"
            className="navLink-normal"
            activeClassName="navLink-selected"
          >
            {/* Will possibly change this to activeClassName when using css file */}
            About Us
          </NavLink>
          <NavLink
            to="/help"
            className="navLink-normal mr-sm-2"
            activeClassName="navLink-selected"
          >
            {/* Will possibly change this to activeClassName when using css file */}
            Help/FAQs
          </NavLink>
          <Nav className="ml-auto">
            <Button variant="secondary">Logout</Button>
            <Navbar.Text>
              Signed in as: <span id="userEmail">{props.currentUser}</span>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
