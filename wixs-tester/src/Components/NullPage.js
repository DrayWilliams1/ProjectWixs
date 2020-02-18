// Dependencies
import React from "react";
import { Container } from "react-bootstrap";

// Components
import NavBar from "./NavBar";

// CSS/SASS
import "./sass/NullPage.scss";

function NullPage() {
  return (
    <div>
      <NavBar />
      <Container>
        <div className="word-content">
          <h2>404 - Page does not exist</h2>
          <br />
          <br />

          <h3>-- Joke of the Month: February Edition --</h3>
          <h4>Computer Science Majors: Beep Boop Boop</h4>
          <br />
          <h4>Employers: 100k Salary</h4>
        </div>
      </Container>
    </div>
  );
}

export default NullPage;
