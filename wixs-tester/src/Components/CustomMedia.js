// Dependencies
import React, { Component } from "react";
import {Card, Button} from 'react-bootstrap';

// CSS/SASS
import "./sass/CustomMedia.scss";

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
      file_type: baseType,
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

    if(this.props.content['file_name']) { // If the file name data exists

      const params = { // Only need to send file name as it is unique
        file_name: this.props.content['file_name']
      };

      console.log("Delete button clicked for " + this.props.content['file_name']);

    } else {
      alert("Error capturing file data for submission");
    }
  }

  render() {
    if (this.state.file_type === "image") {
      // an image
      return (
        <Card>
          <Card.Img className="image-content" variant="top" src={this.props.content['file_location']}/>
          <Card.Title>Image {this.props.listNum}</Card.Title>
          <Card.Text><strong>File name: </strong>{this.props.content['file_name']}</Card.Text>
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
