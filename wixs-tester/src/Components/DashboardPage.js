// Dependencies
import React, { Component } from "react";
import { Container, Button, Card, CardDeck, CardImg } from "react-bootstrap";
import axios from "axios";
import auth from "/auth.js";
import qs from "qs"; // for packaging details collected from the form

// CSS/SASS
import "./sass/DashboardPage.scss";

const GET_TEMPLATES_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/templateFetch.php";
const GET_USER_URL = "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUser.php";
var templateArray = [3];

/**
 * Purpose: This is a file containing...
 */
export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    var currentUser = auth.getCookie("user");

    this.state = {
      email: currentUser,
      first_name: "",
      last_name: "",
      admin: false // if user is admin, display link to admin page
    };

    this.getUser = this.getUser.bind(this);
    this.getTemplates = this.getTemplates.bind(this);
    
  }

  /**
   * Obtains the user details from the database
   */
  getUser() {
    const params = {
      email: this.state.email
    };

    axios
      .post(GET_USER_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
          // TODO: do something with the sent data here. Can set the first name in state so it can be displayed. Also display a link to the admin page if the user is an admin. This page will eventually be the only one showing links to admin page and editor page so they can be removed from nav bar
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Obtains the user's templates from the database
   */
  getTemplates() {
    const params = {
      email: this.state.email
    };

    axios
      .post(GET_TEMPLATES_URL, qs.stringify(params))
      .then(response => {
        console.log(response);
        if (response.data["success"] === true) {
          console.log(response);
          templateArray = response.data['templates'];
          console.log(templateArray[0]);
          console.log("first template name: " + templateArray[0].custom_name)
          // TODO: do something with the sent data here. Generate the cards below or set data for a routine so they can be created
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Executes when the component has rendered
   */
  componentDidMount() {
    var currentUser = auth.getCookie("user");

    if (currentUser) {
      // user is signed in, get user object from database
      this.setState({
        email: currentUser
      });

      this.getUser(currentUser); // get user from database which matches email from cookies
      this.getTemplates(currentUser); // get templates that belong to currently signed in user
    }
  }

createCards(templates) {
  console.log(templates[0].custom_name)
  return templates.map(this.createCard);
}

createCard(template) {
  return (
  <Card key={template}>
  <Card.Img variant="top" />
  <Card.Body>
    {console.log(template.custom_name)}
    <Card.Title>{template.custom_name}</Card.Title>
    <Card.Text>Example</Card.Text>
  </Card.Body>
  <Card.Footer>
    <small className="text-muted">Last updated 3 minutes ago.</small>
    <span>&nbsp;&nbsp;</span>
    <Button variant="primary" size="sm">
      {" "}
      Edit{" "}
    </Button>
    <span>&nbsp;&nbsp;</span>
    <Button variant="danger" size="sm">
      {" "}
      Delete{" "}
    </Button>
  </Card.Footer>
</Card>);
}

  render() {

    const isAuthenticated = auth.isAuthenticated();
    let greeting;

    //this.getTemplates();
    //templates[0] = templateArray[0].custom_name;
    //templates[1] = templateArray[1].custom_name;
    //templates[2] = templateArray[2].custom_name;
    console.log(templateArray[0].custom_name);
    //console.log(templates[1]);
    //console.log(templates[2]);

    if (isAuthenticated) {
      greeting = (
        <h1>
          Welcome <i>{this.state.email}</i> to your Dashboard!
        </h1>
      );
    } else {
      <h1>Hello asshole</h1>;
    }
    return (
      <div>
        <Container>
          <div className="word-content">{greeting}</div>
        </Container>

        <Container>
          <div className="template-selection">
            <a href="#/editor">
              <h2 className="editor-link">Your Templates</h2>
            </a>
            <CardDeck className="card-deck">
              {console.log(templateArray[0].custom_name)}
              {this.createCards(templateArray)}
            </CardDeck>
          </div>
        </Container>
      </div>
    );
  }
}
