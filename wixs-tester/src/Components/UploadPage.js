// Dependencies
import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import auth from "/auth.js";

// CSS/SASS
import "./sass/UploadPage.scss";

const FILE_UPLOAD_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/fileUpload.php";

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

    this.onChange = this.onChange.bind(this);
    //this.onClickHandler = this.onClickHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  /**
   *
   *
   * @param {*} event the event that launched the function
   */
  async onSubmit(event) {
    event.preventDefault();
    let res = await this.uploadFile(this.state.selectedFile);

    console.log(res.data);
  }

  /**
   * For holding on to the file uploaded in a state
   *
   * @param {*} event the event that launched the function
   */
  onChange(event) {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  /**
   * For saving the file to the server
   *
   * @param {*} file
   */
  async uploadFile(file) {
    const formData = new FormData();

    formData.append("avatar", file);

    return await axios
      .post(FILE_UPLOAD_URL, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>File Upload Page</h1>
        <h2>Upload your files to the Project Wixs system</h2>

        <Container>
          <div className="gallery-selection">
            <h2>Your Gallery</h2>
            <form onSubmit={this.onSubmit}>
              <input type="file" onChange={this.onChange} />
              <Button type="submit" variant="success">
                Upload
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
