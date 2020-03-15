// Dependencies
import React, { Component } from "react";

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
      file_name: props.content["file_name"]
    };
  }

  render() {
    if (this.state.file_type === "image") {
      // an image
      return (
        <div>
          <p>{this.state.file_name}</p>
          <img className="image-content" src={this.state.file_location} />
        </div>
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
