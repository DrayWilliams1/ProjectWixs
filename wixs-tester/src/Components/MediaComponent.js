// Dependencies
import React, { Component } from "react";
import {Card, Button} from 'react-bootstrap';

// CSS/SASS
import "./sass/MediaComponent.scss";

/**
 * Purpose: This is a file displaying a photo or video element depending on the props sent to it
 */
export default class MediaComponent extends Component {
  constructor(props) {
    super(props);

    const type = props.content["file_type"];
    const baseType = type.substring(0, type.indexOf("/")); // helps identify general file type (image, video, etc.)

    this.state = {
      file_type: baseType,
      file_location: props.content["file_location"],
      file_name: props.content["file_name"],
      listNum: props.listNum
    };

    this.deleteContent = this.deleteContent.bind(this);
  }

  deleteContent(event) {
    event.preventDefault();

    if(this.state.file_name) { // If the file name data exists

      const params = { // Only need to send file name as it is unique
        file_name: this.state.file_name
      };

      console.log("Delete button clicked for " + this.state.file_name);

    } else {
      alert("Error capturing file data for submission");
    }
  }

  render() {
    if (this.state.file_type === "image") {
      // an image
      return (
        <Card>
          <Card.Img className="image-content" variant="top" src={this.state.file_location}/>
          <Card.Title>Image {this.state.listNum}</Card.Title>
          <Card.Text><strong>File name: </strong>{this.state.file_name}</Card.Text>
          <Button className="content-delete-button" variant="danger" onClick={this.deleteContent}>Delete</Button>
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
