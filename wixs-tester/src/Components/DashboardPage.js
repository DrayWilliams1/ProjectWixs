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

  getUser() {
    const params = {
      email: this.state.email
    };

    axios
      .post(GET_USER_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
          // do something with the sent data here. Generate the cards below or set data for a routine so they can be created
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTemplates() {
    const params = {
      email: this.state.email
    };

    axios
      .post(GET_TEMPLATES_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
          // do something with the sent data here. Generate the cards below or set data for a routine so they can be created
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

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

  render() {
    //React.createElement(<Cards2/>);
    //ReactDOM.render(<Cards2/>, document.getElementById("root"));
    const isAuthenticated = auth.isAuthenticated();
    let greeting;

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
            <CardDeck>
              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Template 1</Card.Title>
                  <Card.Text>Placeholder.</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
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
              </Card>
              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Template 2</Card.Title>
                  <Card.Text>Placeholder 2.</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                  <span>&nbsp;&nbsp;</span>
                  <Button variant="secondary" size="sm">
                    {" "}
                    Edit{" "}
                  </Button>
                  <span>&nbsp;&nbsp;</span>
                  <Button variant="danger" size="sm">
                    {" "}
                    Delete{" "}
                  </Button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Template 3</Card.Title>
                  <Card.Text>
                    Placeholder 3 with extra text: This is a wider card with
                    supporting text below as a natural lead-in to additional
                    content. This card has even longer content than the first to
                    show that equal height action.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                  <span>&nbsp;&nbsp;</span>
                  <Button variant="dark" size="sm">
                    {" "}
                    Edit{" "}
                  </Button>
                  <span>&nbsp;&nbsp;</span>
                  <Button variant="danger" size="sm">
                    {" "}
                    Delete{" "}
                  </Button>
                </Card.Footer>
              </Card>
            </CardDeck>
          </div>
        </Container>
      </div>
    );
  }
}
