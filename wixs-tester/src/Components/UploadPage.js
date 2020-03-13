// Dependencies
import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import auth from "/auth.js";

// CSS/SASS
import "./sass/UploadPage.scss";

const FILE_UPLOAD_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/fileUpload.php";
const MAX_IMG_SIZE = 5000000; // 5MB maximum photo size
const MAX_VID_SIZE = 25000000; // 25MB maximum video size

/**
 * Purpose: This is a file containing upload page of the Project Wixs system.
 *
 * -- Additional Notes --
 * - Image and video maximum file sizes ontained from SRS document Section 5.2 (Safety Requirements)
 * - Input will only accept Images of type .jpg and .png
 * - Input will only accept Videos of type .mp4
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
    this.verifyFile = this.verifyFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  /**
   * Verifies that the currently selected file meets system constraints before submitting to database
   *
   * @param {*} file the file to be verified for size and type constraints
   */
  verifyFile(file) {
    const size = file["size"];
    const type = file["type"];
    const baseType = type.substring(0, type.indexOf("/")); // helps identify general file type (image, video, etc.)
    const ext = type.substring(type.indexOf("/") + 1); // to get file extension

    //console.log(size);
    //console.log(type);
    //console.log(baseType);
    //console.log(ext);

    if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "mp4") {
      // file is not of acceptable format
      alert("File must be of acceptable type (extension)");
      return false; // invalid file
    }

    if (baseType === "image" && size > MAX_IMG_SIZE) {
      // image is too large
      alert("Image must be under 5MB");
      return false; // invalid file
    }

    if (baseType === "video" && size > MAX_VID_SIZE) {
      // video is too large
      alert("Video must be under 25MB");
      return false; // invalid file
    }

    return true; // passed tests, therefore valid
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

      if (this.verifyFile(file)) {
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
      }

      //else {
      //window.location.reload();
      // document.getElementById('your_input_id').value= null; // may use this instead of page reload
      //}

      /*
      // Display the values
      for (var value of formData.values()) {
        console.log(value);
      }

      // Display the keys
      for (var key of formData.keys()) {
        console.log(key);
      }
      */
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
          <h2>Upload your files to the Project Wixs system</h2>
        </Container>

        <Container>
          <div className="gallery-selection">
            <form onSubmit={this.onSubmit}>
              <input
                type="file"
                onChange={this.onChange}
                accept="image/jpg,image/jpeg,image/png,video/mp4"
              />
              <Button type="submit" variant="success">
                Upload
              </Button>
            </form>
            <p>
              Accepted files: Images (<strong>Type:</strong> <em>.jpg, .png</em>
              ) (<strong>Size:</strong> &lt; 5MB) || Videos (
              <strong>Type:</strong> <em>.mp4</em>) (<strong>Size:</strong> &lt;
              25MB)
            </p>
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
