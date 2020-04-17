// Dependencies
import React from "react";
import { Button, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

// Assets
import logo from "./assets/logo-v6.png";
import editorPreview from "./assets/editorPreview.png";
import uploadPreview from "./assets/uploadPreview.png";
import liveEditor from "./assets/liveEditor.png";

// CSS/SASS
import "./sass/HomePage.scss";

/**
 * Purpose: This is a file containing the landing of the ProjectWixs front-end. It documents basic
 * layout and functionality of the home page.
 */
function HomePage() {
  return (
    <div>
      <div className={"homePageGrid"}>
        <img
          src={logo}
          className={"homeLogo"}
          style={{ gridArea: ". logo ." }}
        />

        {/*CARDS*/}
        <Card
          style={{ gridArea: "content1", margin: "15px" }}
          border={"info"}
          className="text-center"
        >
          <Card.Body>
            <Card.Img variant="top" src={editorPreview} />
            <Card.Title>Easy-to-Use Editor</Card.Title>
            <Card.Text>
              No experience with HTML? No worries! With Project Wixs, our editor
              will do the heavy lifting for you, allowing you to focus on
              creating the content your company needs.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{ gridArea: "content2", margin: "15px" }}
          border={"info"}
          className="text-center"
        >
          <Card.Body>
            <Card.Img variant="top" src={uploadPreview} />
            <Card.Title>Content Uploading Services</Card.Title>
            <Card.Text>
              Project Wixs allows users to upload a range of media
              content to the server. This media can then be shared easily on
              your Project Wixs site!
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          style={{ gridArea: "content3", margin: "15px" }}
          border={"info"}
          className="text-center"
        >
          <Card.Body>
            <Card.Img variant="top" src={liveEditor} />
            <Card.Title>Responsive Live Editor</Card.Title>
            <Card.Text>
              Get your site up and running <i>fast</i>. Start with one of our
              default templates, modifying as you go along. With our auto-save
              and upload editor, users will see your design come to life
              before their very eyes!
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <h2
        className={"goMessage"}
        style={{ gridArea: ". goMsg .", margin: "15px" }}
        border={"info"}
        className="text-center"
      >
        Get started today!
      </h2>
      <div className={"loginORregister"}>
        <Button variant="primary" href="#/login">
          Login
        </Button>
        <p>Or</p>
        <Button variant="warning" href="#/register">
          Register
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
