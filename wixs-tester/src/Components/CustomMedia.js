// Dependencies
import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs"; // for packaging details collected from the form

// CSS/SASS
import "./sass/CustomMedia.scss";

const DELETE_MEDIA_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/deleteMedia.php";

/**
 * Purpose: This is a file displaying a photo or video element depending on the props sent to it
 *
 * -- Additional Notes --
 * - In React it is suggested to avoid setting state to equal props in the constructor. Just access props directly
 * as this will help keep track when updating whther props changed
 */
export default class MediaComponent extends Component {
  constructor(props) {
    super(props);

    const type = props.content["file_type"];
    const baseType = type.substring(0, type.indexOf("/")); // helps identify general file type (image, video, etc.)

    this.state = {
      file_type: baseType
    };

    this.deleteContent = this.deleteContent.bind(this);
  }

  /**
   *
   *
   * @param {*} event
   */
  deleteContent(event) {
    event.preventDefault();

    if (this.props.content["content_id"]) {
      // If the file name data exists

      const params = {
        // Only need to send file name as it is unique
        content_id: this.props.content["content_id"]
      };

      axios
        .post(DELETE_MEDIA_URL, qs.stringify(params))
        .then(response => {
          console.log(response);

          alert(response.data["message"]);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
      //console.log("Delete button clicked for " + this.props.content['file_name']);
    } else {
      alert("Error capturing file data for deletion");
    }
  }

  render() {
    if (this.state.file_type === "image") {
      // an image
      return (
        <Card>
          <Card.Img
            className="image-content"
            variant="top"
            src={this.props.content["file_location"]}
          />
          <Card.Title>Image {this.props.listNum}</Card.Title>
          <Card.Text>
            <strong>File name: </strong>
            {this.props.content["file_name"]}
          </Card.Text>
          <Button
            className="content-delete-button"
            variant="danger"
            onClick={this.deleteContent}
          >
            Delete
          </Button>
        </Card>
      );
    } else {
      // a video
      return (
        <div>
          <p>This is a video</p>
        </div>
      );
    }
  }
}
