// Dependencies
import React from "react";
import { Container } from "react-bootstrap";

// Components

// CSS/SASS
import "./sass/HelpPage.scss";

/**
 * Purpose: This is a file containing the help page of the ProjectWixs front-end. It documents basic layout and functionality of the help/FAQ page.
 */
function HelpPage() {
  return (
    <div>
      <Container>
        <div className="word-content">
          <h1>Help and FAQs</h1>
          {/* Will give errors in the inspector for certain modifiers, hwoever, nothing is wrong. */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/71EZb94AS1k"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h3>How to Use</h3>
          <p>
            ProjectWixs is a Content Management System allowing for a seamless
            creation of single-page web pages featuring an easy-to-use drag and
            drop component interface. ProjectWixs aims to provide an intuitive
            experience for a wide range of users; from complete beginners
            unfamiliar with any form of web design or HTML, to veteran designers
            with multiple years of experience. The system will be able to have
            up to ten user accounts that can create and edit web pages with a
            range of content typical of any modern day website (such as text,
            images, and video). Users will be able to create, edit, and delete
            up to four templates and publish one at any time for live viewing.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default HelpPage;
