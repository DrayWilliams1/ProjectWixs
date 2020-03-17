// Dependencies
import React, { Component } from "react";
import { Container, Button, Card, CardDeck, CardImg } from "react-bootstrap";

// CSS/SASS
import "./sass/CustomCard.scss";

/**
 * Purpose: This is a file displaying a card element to represent a template on the dashboard page
 */
export default class CustomCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        template: this.props.template,
        type: this.props.template.is_active
    }

    this.dateDifference = this.dateDifference.bind(this);
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


  render() {
            if (this.state.type)
            {
                return (
                <Card border="success">
                  <Card.Body>
                    <Card.Title>{this.state.template.custom_name}
                    <span>&nbsp;&nbsp;</span>
                    <small className="text-muted">  (Active Template) </small>
                    </Card.Title>
                    <Card.Text>
                    
                    <Button variant="primary" size="sm">
                      {" "}
                      Edit{" "}
                    </Button>
                    <span>&nbsp;&nbsp;</span>
                    <Button variant="danger" size="sm">
                      {" "}
                      Delete{" "}
                    </Button>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated {this.dateDifference(this.state.template.last_modified)}
                    </small>
                    <span>&nbsp;&nbsp;</span>
                  </Card.Footer>
                </Card>
                );
            } else {
                return (
                <Card>
                <Card.Body>
                  <Card.Title>{this.state.template.custom_name}</Card.Title>
                  <Card.Text> 
                    <Button variant="primary" size="sm">
                      {" "}
                      Edit{" "}
                    </Button>
                    <span>&nbsp;&nbsp;</span>
                    <Button variant="danger" size="sm">
                      {" "}
                      Delete{" "}
                    </Button></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Last updated {this.dateDifference(this.state.template.last_modified)}
                  </small>
                </Card.Footer>
              </Card>
            )}
  }
}