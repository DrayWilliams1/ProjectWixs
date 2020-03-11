// Dependencies
import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import auth from "/auth.js";

// CSS/SASS
import "./sass/UploadPage.scss";

/**
 * Purpose: This is a file containing...
 */
export default class UploadPage extends Component {
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
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  }

  //For saving the file to the server
  onClickHandler(event) {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    //axios.post("/", data); //Need PHP Code
  }

  render() {
    return (
      <div>
        <h1>Upload Page</h1>
        <h2>Upload your files to the Project Wixs system</h2>

        <Container>
          <div className="gallery-selection">
            <h2>Your Gallery</h2>
            <form>
              <input type="file" name="file" onChange={this.onChangeHandler} />
              <Button variant="success" onClick={this.onClickHandler}>
                Upload
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
