// Dependencies
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios"; //AJAX call to PHP file
import qs from "qs"; // for packaging details collected from the form
import auth from "/auth.js";

// CSS/SASS
import "./sass/CustomTableRow.scss";

const DELETE_USER_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/deleteUser.php";
const SET_ADMIN_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/setUserAdmin.php";
/**
 * Purpose: This is a file displaying a photo or video element depending on the props sent to it
 */
export default class CustomTableRow extends Component {
  constructor(props) {
    super(props);

    this.state={
      email: this.props.user.email, 
    }
  }

  toggleAdmin(email, e){
    e.preventDefault();
    const params = {
      email: email
    }
    var currentUser = auth.getCookie("user");
    console.log(this.loggedInUser)
    console.log(email)
    if(currentUser==email){
      alert("You're already an Admin, you egg")
    }
    else{
    alert("User: "+email+" will become Admin")
    axios
      .post(SET_ADMIN_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
            console.log(response.data["user"], response.data["message"])
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
      window.location.reload(false);
    }
  }
  
  deleteUser(email, e){
    e.preventDefault();
    const params = {
      email: email
    }
    var currentUser = auth.getCookie("user");
    if(currentUser==email){
      alert("Stop trying to delete yourself")
    }
    else{
    alert("User: "+email+" will be deleted")
    axios
      .post(DELETE_USER_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
            console.log(response.data["user"], response.data["message"])
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
      window.location.reload(false);
    }
  }

  render() {
    let isAdmin;

    if(this.props.user.admin){
        isAdmin = (<th style={{ color: 'green'}}>YES</th>);
        console.log("user is admin");
    } else {
        isAdmin = (<th> </th>);
        console.log("user is not admin");
    }
    return (
        <tr>
        <th>{this.props.user.user_id}</th>
        <th>{this.props.user.email}</th>
        <th>{this.props.user.first_name}</th>
        <th>{this.props.user.last_name}</th>
        {isAdmin}
        <th>{this.props.user.template_count}</th>
        <th><Button id={this.props.user.email} variant='outline-warning' size='sm' 
                    onClick={(e) => this.toggleAdmin(this.props.user.email, e)}>
              Make Admin
            </Button>
        </th>
        <th><Button id={this.props.user.email} variant='outline-danger' size='sm' 
                    onClick={(e) => this.deleteUser(this.props.user.email, e)}>
              Delete
            </Button>
        </th>
        </tr>
    )}
}