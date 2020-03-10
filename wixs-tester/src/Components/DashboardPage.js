// Dependencies
import React, { Component } from "react";
import { Container, Button, Card } from "react-bootstrap";
import axios from 'axios';

import auth from "/auth.js";


// CSS/SASS
import "./sass/DashboardPage.scss";

/**
 * Purpose: This is a file containing...
 */
export default class DashboardPage extends Component {
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
  onChangeHandler(event){
    event.preventDefault();
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0
      });
    }

  //For saving the file to the server
  onClickHandler(event){
   const data = new FormData()
   data.append('file', this.state.selectedFile)
   axios.post("/", data)//Need PHP Code
  }

  render() {
    const isAuthenticated = auth.isAuthenticated();
    var currentUser = auth.getCookie("user");
    let greeting;

    if(isAuthenticated){
      greeting=(
        <h1>Welcome <i>{currentUser}</i> to your Dashboard!</h1>
      );
    }
    else{
      <h1>Hello asshole</h1>
    }
    return (
      <div>
        <Container>
          <div className="word-content">
            {greeting}
          </div>

        </Container>
        <Container>
          <div className="template-selection">
            <a href="#/editor"><h2 className="editor-link" >Your Templates</h2></a>
          </div>
        </Container>
        <Container>
          <div className="gallery-selection">
            <h2>Your Gallery</h2>
            <input type="file" name="file" onChange={this.onChangeHandler}/>
            <Button variant="success" onClick={this.onClickHandler}>
              Upload
            </Button>
          </div>
         </Container>
      </div>
    );
  }
}
