// Dependencies
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// Assets
import logo from "./assets/logo-v6.png";
import editorPreview from "./assets/editorPreview.png";
import uploadPreview from "./assets/uploadPreview.png";
import plaintextPreview from "./assets/plaintextPreview.png";

// CSS/SASS
import "./sass/HomePage.scss";
import "./sass/Colors.scss";

/**
 * Purpose: This is a file containing the landing of the ProjectWixs front-end. It documents basic
 * layout and functionality of the home page.
 */
function HomePage() {
  return (
    <div>
      <div className={"homePageGrid"}>
        <img src={logo} className={"homeLogo"} />
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
              No experience with HTML? No worries! With Project Wixs, our editor will do the heavy lifting for you, allowing you to focus
              on creating the content your company needs.
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
              Project Wixs allows users to upload a range of photo and video content to the server. This media can then be shared easily on 
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
            <Card.Img variant="top" src={plaintextPreview} />
            <Card.Title>Advanced Editor Features</Card.Title>
            <Card.Text>
              Comfortable with web design? Switch to the plain text editor to create your ideal web page from scratch or use it in conjuction 
              with our drag-and-drop editor to get your site up and running <i>fast</i>.
            </Card.Text>
          </Card.Body>
        </Card>

        <h2 className={"goMessage"}>Get started today!</h2>
        <div className={"loginORregister"}>
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <p>Or</p>
          <Link to="/register">
            <Button variant="warning">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
