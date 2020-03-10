// Dependencies
import React, { Component } from "react";
import { Container, Button, Card, CardDeck, CardImg } from "react-bootstrap";
import axios from "axios";
import auth from "/auth.js";

// CSS/SASS
import "./sass/DashboardPage.scss";

/**
 * Purpose: This is a file containing...
 */
export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first_name: "",
      selectedFile: null
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  //For holding on to the file uploaded in a state
  onChangeHandler(event) {
    event.preventDefault();
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  }

  //For saving the file to the server
  onClickHandler(event) {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios.post("/", data); //Need PHP Code
  }

  render() {
    //React.createElement(<Cards2/>);
    //ReactDOM.render(<Cards2/>, document.getElementById("root"));
    const isAuthenticated = auth.isAuthenticated();
    var currentUser = auth.getCookie("user");
    let greeting;

    if (isAuthenticated) {
      greeting = (
        <h1>
          Welcome <i>{currentUser}</i> to your Dashboard!
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
