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
   * Submits the file to the database after confirming that the user is signed in (authenticated)
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

      // Display the values
      for (var value of formData.values()) {
        console.log(value);
      }

      // Display the keys
      for (var key of formData.keys()) {
        console.log(key);
      }

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
      window.location.href = "./"; // redirects to project homepage
    }
  }

  /**
   * Checks if the user has selected a file and submits the file to the database
   *
   * @param {*} event the event that launched the function
   */
  async onSubmit(event) {
    event.preventDefault();
    if (this.state.selectedFile) {
      // if a file is currently selected, then submit
      this.uploadFile(this.state.selectedFile);
    } else {
      // no file selected
      alert("No file selected. Try again.");
    }
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
        <Container>
          <h1>File Upload</h1>
          <p>Upload your files to the Project Wixs system</p>
        </Container>

        <Container>
          <div className="gallery-selection">
            <form onSubmit={this.onSubmit}>
              <input
                type="file"
                onChange={this.onChange}
                placeholder="Choose an image or video."
              />
              <Button type="submit" variant="success">
                Upload
              </Button>
            </form>
          </div>
        </Container>
        <Container>
          <h2>Media Gallery</h2>
          <p>
            Below will display all content owned by {auth.getCookie("user")} in
            the database
          </p>
        </Container>
      </div>
    );
  }
}
