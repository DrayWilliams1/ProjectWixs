// Dependencies
import React, { Component } from "react";
import { Container, CardDeck, Form, Button } from "react-bootstrap";
import axios from "axios";
import auth from "/auth.js";
import qs from "qs"; // for packaging details collected from the form
import CustomCard from "./CustomCard";

// CSS/SASS
import "./sass/DashboardPage.scss";

// Axios URLs
const GET_TEMPLATES_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/getAllUserTemplates.php";
const GET_USER_URL = "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUser.php";
const CREATE_TEMPLATE_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/addTemplate.php";

var dateFormat = require("dateformat");

/**
 * Purpose: This is a file containing the functionality required to support the dashboard page (/#/dashboard)
 */
export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    var currentUser = auth.getCookie("user");

    this.state = {
      email: currentUser,
      first_name: "",
      last_name: "",
      admin: false, // if user is admin, display link to admin page
      templateArray: [],
      custom_name: "", // the name to create a new template with
      publishedLink:
        "http://cosc.brocku.ca/~c4f00g02/projectWixs/#/published?user=",
    };

    this.getUser = this.getUser.bind(this);
    this.getTemplates = this.getTemplates.bind(this);
    this.cNameChanged = this.cNameChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputsValidated = this.inputsValidated.bind(this);
  }

  /**
   * Obtains the user details from the database
   */
  getUser() {
    const params = {
      email: this.state.email,
    };

    axios
      .post(GET_USER_URL, qs.stringify(params))
      .then((response) => {
        console.log(response.data);

        if (response.data["success"] === true) {
          this.setState({
            first_name: response.data.user.first_name,
          });
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Obtains the user's templates from the database
   */
  getTemplates() {
    const params = {
      email: this.state.email,
    };

    axios
      .post(GET_TEMPLATES_URL, qs.stringify(params))
      .then((response) => {
        console.log(response);
        if (response.data["success"] === true) {
          this.setState({
            templateArray: response.data["templates"],
          });
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Updates the component state to reflect the custom template name
   *
   * @param {*} e the event that launched the function
   */
  cNameChanged(e) {
    this.setState({
      custom_name: e.target.value,
    });
  }

  /**
   * Validates that the custom name was entered before sending the axios request
   */
  inputsValidated() {
    if (this.state.custom_name === "") {
      // template custom name is empty

      alert("New template must be given custom name.");
      return false;
    }

    return true;
  }

  /**
   * Submits the input details to the PHP script using axios' HTTP POST request
   *
   * @param {*} event the event that launched the function
   */
  handleSubmit(event) {
    event.preventDefault();

    // creating and setting unique user session id

    if (this.inputsValidated()) {
      // if no inputs are empty upon button click
      // setting params for axios form submission

      const currentTime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

      // A basic layout template to create new templates with
      var jsonObj = JSON.parse(
        '{"gridElements":[{"type":"ContentWithHeader","props":{"key":"ljmrcy5w7oqcdnekk5q0j","data-grid":{"x":0,"y":0,"h":4,"w":4,"minW":2,"minH":3},"header":{"type":"String","name":"Header","value":"New Template"},"content":{"type":"RichText","name":"Body","value":{"blocks":[{"key":"e950j","text":"Drag things. Drop things. Edit things. Add a new component to the layout by pressing the yellow ' +
          ' button to the right. Component data can be altered within the second orange section and basic CSS properties can be altered within the third blue section below.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}}},"style":{"fontSize":"1em","color":"#2a2424","backgroundColor":"#dcf7e0"}},{"type":"Table","props":{"key":"vww39k969ten5hsurisn","data-grid":{"x":0,"y":9,"h":5,"w":5,"minW":4,"minH":4},"content":{"type":"Array","min":1,"max":5,"name":"Columns","schema":{"type":"Array","min":1,"max":5,"name":"Data","schema":{"type":"String","name":"column data","value":""},"value":[""]},"value":[["Possibly","Add","Tables"]]}},"style":{"fontSize":"1em","color":"#000","backgroundColor":"#ddfaff"}}],"layout":[{"w":3,"h":9,"x":1,"y":0,"i":"ljmrcy5w7oqcdnekk5q0j","minW":2,"minH":3,"moved":false,"static":false},{"w":4,"h":6,"x":4,"y":0,"i":"vww39k969ten5hsurisn","minW":4,"minH":4,"moved":false,"static":false}]}'
      );

      const newTemplate = JSON.stringify(jsonObj); // turning the JSON object into a string for axios submission

      const params = {
        owner_email: this.state.email,
        custom_name: this.state.custom_name,
        last_modified: currentTime,
        template_data: newTemplate,
      };

      axios
        .post(CREATE_TEMPLATE_URL, qs.stringify(params))
        .then((response) => {
          console.log(response);

          if (response.data["success"] === true) {
            alert(response.data["message"]);

            window.location.reload();
          } else {
            window.alert(response.data["message"]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  /**
   * Executes when the component has rendered
   */
  componentDidMount() {
    this.getUser(); // get user from database which matches email from cookies
    this.getTemplates(); // get templates that belong to currently signed in user
  }

  render() {
    const isAuthenticated = auth.isAuthenticated();
    let greeting;

    if (isAuthenticated) {
      greeting = (
        <h1>
          Welcome to your Dashboard <strong>{this.state.first_name}</strong>
        </h1>
      );
    } else {
      greeting = <h1>Hello asshole</h1>;
    }

    return (
      <div>
        <Container>
          <div className="word-content">{greeting}</div>
        </Container>

        <Container>
          <span>
            <strong>Shareable live site link available at:</strong>{" "}
            {this.state.publishedLink}
            {this.state.email}
          </span>
        </Container>

        <Container>
          <div className="template-selection">
            <h2> Your Templates</h2>
            <CardDeck className="card-deck">
              {this.state.templateArray.map((template, i) => (
                <CustomCard template={template} key={i} />
              ))}
              <div id="all_cards"></div>
            </CardDeck>
          </div>
        </Container>

        <Container>
          <div className="custom-template-form">
            <div>
              <h2>Create a new template</h2>
            </div>
            <Form>
              <Form.Group controlId="formGroupTemplate">
                <Form.Label>
                  Template Custom Name <strong>(Required)</strong>
                </Form.Label>
                <Form.Control
                  value={this.state.custom_name}
                  onChange={this.cNameChanged}
                  size="lg"
                  type="text"
                  placeholder="Enter template name"
                  maxLength="100"
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                onClick={this.handleSubmit}
              >
                Create Template
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
