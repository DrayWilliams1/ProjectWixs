// Dependencies
import React from "react";
import { Container } from "react-bootstrap";

// CSS/SASS
import "./sass/NullPage.scss";

/**
 * Purpose: This is the null page acting as a catch-all for any pages not currently setup for routing within the
 * application. It is the custom 404 page.
 */
function NullPage() {
  return (
    <div>
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
