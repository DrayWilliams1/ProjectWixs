// Dependencies
import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import qs from "qs"; // for packaging details collected from the form

// CSS/SASS
import "./sass/CustomCard.scss";
const DEL_TEMPLATE_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/deleteTemplate.php";

/**
 * Purpose: This is a file displaying a card element to represent a template on the dashboard page
 */
export default class CustomCard extends Component {
  constructor(props) {
    super(props);

    this.dateDifference = this.dateDifference.bind(this);
    this.toEditor = this.toEditor.bind(this);
    this.delTemplate = this.delTemplate.bind(this);
  }

  /**
   * Returns the difference between a specified date/time and the current date/time in a human-friendly form.
   *
   * @param {*} oldDate The specified date/time to be compared with the current date/time.
   */
  dateDifference(oldDate) {
    var old = new Date(oldDate);
    var total = "";
    var today = new Date();

    var diffMs = today - old; // milliseconds between now & input time
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if (diffDays == 0 && diffHrs == 0)
      total = total.concat(diffMins + " mins ago.");
    else if (diffDays == 0)
      total = total.concat(diffHrs + " hours, " + diffMins + " mins ago.");
    else if (diffHrs == 0)
      total = total.concat(diffDays + " days, " + diffMins + " mins ago.");
    else
      total = total.concat(
        diffDays + " days, " + diffHrs + " hours, " + diffMins + " mins ago."
      );

    return total;
  }

  /**
   * Directs to the template editor page while including the template to be loaded and edited
   */
  toEditor() {
    window.location.href = "#/editor";
    // TODO: will eventually include the template_id in the url so it can be retrieved by the editor page. Can append it -- will discuss
  }

  /**
   * Deletes a specified user template from the database
   */
  delTemplate() {
    const params = {
      template_id: this.props.template["template_id"]
    };

    axios
      .post(DEL_TEMPLATE_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        alert(response.data["message"]);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.props.template["is_active"]) {
      return (
        <Card border="success">
          <Card.Body>
            <Card.Title>
              {this.props.template["custom_name"]}
              <span>&nbsp;&nbsp;</span>
              <small className="text-muted"> (Active Template) </small>
            </Card.Title>
            <Card.Text>
              <Button variant="primary" size="sm" onClick={this.toEditor}>
                Edit
              </Button>
              <span>&nbsp;&nbsp;</span>
              <Button variant="danger" size="sm" onClick={this.delTemplate}>
                Delete
              </Button>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated{" "}
              {this.dateDifference(this.props.template["last_modified"])}
            </small>
            <span>&nbsp;&nbsp;</span>
          </Card.Footer>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Body>
            <Card.Title>{this.props.template["custom_name"]}</Card.Title>
            <Card.Text>
              <Button variant="primary" size="sm" onClick={this.toEditor}>
                Edit
              </Button>
              <span>&nbsp;&nbsp;</span>
              <Button variant="danger" size="sm" onClick={this.delTemplate}>
                Delete
              </Button>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated{" "}
              {this.dateDifference(this.props.template["last_modified"])}
            </small>
          </Card.Footer>
        </Card>
      );
    }
  }
}
