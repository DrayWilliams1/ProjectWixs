import React, { Component } from "react";
import axios from 'axios'; //AJAX call to PHP file
import Table from 'react-bootstrap/Table'

const IS_USER_ADMIN_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/isAdmin.php"

import "./sass/AdminPage.scss"
import auth from "/auth.js";
import { Container } from "react-bootstrap";

export default class AdminPage extends Component{
    constructor(props){
      super(props);
      
      this.state={
        users: []
      }
      this.displayUsers = this.displayUsers.bind(this);
    }

    displayUsers(){

    }

    render(){
      const isAuthenticated = auth.isAuthenticated();
      var currentUser = auth.getCookie("user");
      let greeting;

      if(isAuthenticated){
        greeting=(
          <h1>Welcome back, <i>{currentUser}</i>.</h1>
        );
      }
      else{
        <h1>Hello asshole</h1>
      }
      return(
        <div>
          <Container>
          <div className="word-content">
            {greeting}
          </div>
          </Container>

          <Container>
          <h2>ProjectWixs Userbase</h2>

          <Table striped bordered hover variant="dark" reposnive="lg">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>E-mail Address</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Password</th>
                  <th>Admin</th>
                  <th># of Templates</th>
                  <th>Session ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>bingo</td>
                  <td>false</td>
                  <td>3</td>
                  <td>mongo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Billybob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>dmsms</td>
                  <td>false</td>
                  <td>2</td>
                  <td>reeeeee</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>javascriptissuffering@lol.com</td>
                  <td>Reba</td>
                  <td>Shoebox</td>
                  <td>password</td>
                  <td>false</td>
                  <td>2</td>
                  <td>123445</td>
                </tr>
              </tbody>
          </Table>
          </Container>
          </div>
            
        
        
      );
    }
}
