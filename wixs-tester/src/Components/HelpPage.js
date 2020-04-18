// Dependencies
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

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
        <Row>
          <Col>
            <div className="word-content">
              <h1>Help and FAQs</h1>
              {/* Will give errors in the inspector for certain modifiers, however, nothing is wrong. */}
              <p>
                This page offers tutorials and guides for those who require help
                with formatting and creation of their site. Please remember for
                intended proper usage of this system, do not block any browser
                alerts and javascript must be enabled. For the sake of
                professors accessing this website who may have cookies stored
                from other student's projects, we recommend clearing any cookies
                stored on the cosc.brocku.ca domain so there are no unintended
                interferences. Any additional issues may also be rememdied by
                whitelisting our site on your Adblocker (we're looking at you
                uBlock Origin) so that third-party services, like the YouTube
                videos available on this page, may display correctly.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="help-sections">
          <Col>
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
          </Col>
          <Col>
            <h2>
              <strong>Account Operations</strong>
            </h2>
            <h3>Registration, Login, and Logout</h3>
            <p>Written walkthrough of how to go about each process...</p>
          </Col>
        </Row>

        <Row className="help-sections">
          <Col>
            <h2>
              <strong>Template Operations</strong>
            </h2>
            <h3>Creation, Editing, Deletion, and Publishing</h3>
            <p>Written walkthrough of how to go about each process...</p>
          </Col>
          <Col>
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
          </Col>
        </Row>

        <Row className="help-sections">
          <Col>
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
          </Col>
          <Col>
            <h2>
              <strong>Content Operations</strong>
            </h2>
            <h3>Uploading and Deletion, and Usage</h3>
            <p>
              Written walkthrough of how to go about each process... usage is
              referring to how they can be accessed and used in the template
              editor section (this can just say refer to 'section' for how to
              make use of uploaded content)
            </p>
          </Col>
        </Row>

        <Row className="help-sections">
          <Col>
            <h2>
              <strong>FAQs</strong>
            </h2>
            <p>
              <strong>Q: </strong>
              How many users can be added to the system?
              <strong> A: </strong>
              15.
            </p>
            <p>
              <strong>Q: </strong>
              What is the maximum size for photo uploads?
              <strong> A: </strong>
              10MB.
            </p>
            <p>
              <strong>Q: </strong>
              How many templates can you have live at once?
              <strong> A: </strong>
              Only 1 at a time.
            </p>
            <p>
              <strong>Q: </strong>
              Do you need internet access to use this system?
              <strong> A: </strong>
              Wait, how are you seeing this page right now?
            </p>
            <p>
              <strong>Q: </strong>
              Do you have an investment strategy for cryptocurrency?
              <strong> A: </strong>
              HODL.
            </p>
            <p>
              <strong>Q: </strong>
              What is Dave Bockus' favourite colour(s)?
              <strong> A: </strong>
              This one is for bonus marks, <em>blue and/or green</em>. Don't
              worry we aren't kiss-asses.
            </p>
          </Col>
        </Row>

        <Row className="help-sections">
          <Col>
            <h2>
              <strong>Looking for system changes/improvements?</strong>
            </h2>
            <p>
              If you have any changes you would like to see within the system.
              Please visit our{" "}
              <a href="https://github.com/DrayWilliams1/ProjectWixs">
                GitHub repo
              </a>{" "}
              to create an issue, fork the system, or branch our creation and we
              will actively be awaiting your input (for the duration of this
              project's associated academic course &#128521;).
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HelpPage;
