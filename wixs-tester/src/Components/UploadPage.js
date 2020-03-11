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
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  /**
   * For saving the file to the server
   *
   * @param {*} file the file to be uploaded to the server
   */
  async uploadFile(file) {
    const formData = new FormData();

    var currentUser = auth.getCookie("user");
    var currentSession = auth.getCookie("usid");

    if (currentUser && currentSession) {
      // user must be signed in to submit file
      formData.append("avatar", file); // puts file into form data
      formData.append("user", currentUser); // puts user name into form data (so that file can be linked to user within database)

      return await axios
        .post(FILE_UPLOAD_URL, formData, {
          headers: {
            "content-type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response);
          alert(response.data["message"]);
          window.location.reload(); // reloads page
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // user is not signed in (based on cookies) -- redirect
      alert("User must be signed in to upload files. Redirecting... ");
      window.location.href = "/";
    }
  }

  /**
   *
   *
   * @param {*} event the event that launched the function
   */
  async onSubmit(event) {
    event.preventDefault();
    this.uploadFile(this.state.selectedFile);
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
