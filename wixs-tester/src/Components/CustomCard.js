// Dependencies
import React, { Component } from "react";
import { Container, Button, Card, CardDeck, CardImg } from "react-bootstrap";

// CSS/SASS
import "./sass/CustomCard.scss";

/**
 * Purpose: This is a file displaying a photo or video element depending on the props sent to it
 */
export default class CustomCard extends Component {
  constructor(props) {
    super(props);

    //const pkey = props.content["key"];
    //console.log("pkey: " + this.props.key);
    //console.log("template: " + this.props.template);
    //const ptemplate = props.content["template"];
    //const ptype = template.is_active;

    this.state = {
        template: this.props.template,
        type: this.props.template.is_active
    }

    this.dateDifference = this.dateDifference.bind(this);
  }

  /**
   * Returns the...
   *
   * @param {*} oldDate
   */
  dateDifference(oldDate) {
    var old = new Date(oldDate);
    var total = "";
    //console.log(old);

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    //console.log(dateTime);

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


  render() {
            if (this.state.type)
            {
                return (
                <Card border="success">
                  <Card.Body>
                    <Card.Title>{this.state.template.custom_name}</Card.Title>
                    <Card.Text>Active template</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Updated {this.dateDifference(this.state.template.last_modified)}
                    </small>
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
                );
            } else {
                return (
                <Card>
                <Card.Body>
                  <Card.Title>{this.state.template.custom_name}</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Updated {this.dateDifference(this.state.template.last_modified)}
                  </small>
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
            )}
  }
}