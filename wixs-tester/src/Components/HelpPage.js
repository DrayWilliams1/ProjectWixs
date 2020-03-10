// Dependencies
import React from "react";
import { Container } from "react-bootstrap";

// CSS/SASS
import "./sass/HelpPage.scss";

/**
 * Purpose: This is a file containing the help page of the ProjectWixs front-end. It documents
 * basic layout and functionality of the help/FAQ page.
 */
function HelpPage() {
  return (
    <div>
      <Container>
        <div className="word-content">
          <h1>Help and FAQs</h1>
          {/* Will give errors in the inspector for certain modifiers, however, nothing is wrong. */}
          <p>
            This page offers tutorials and guides for those who require help with formatting and creation of their site.
          </p>

          {/* Video wrapper div allowing for video that maintains aspect ratio and resizes based on device screen size */}
          <div className="videoWrapper">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/71EZb94AS1k"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </Container>
    </div>
  );
}

export default HelpPage;
