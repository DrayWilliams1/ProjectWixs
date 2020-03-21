// Dependencies
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
//import SweetAlert from "react-bootstrap-sweetalert";
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

    var currentUser = auth.getCookie("user");

    this.state = {
      email: this.props.user.email,
      displayButtons: true,
      currentUser: currentUser
    };
  }

  toggleAdmin(setAdmin, email, e) {
    e.preventDefault();
    const params = {
      email: email,
      setAdmin: setAdmin
    };

    axios
      .post(SET_ADMIN_URL, qs.stringify(params))
      .then(response => {
        console.log(response);
        alert(response.data["message"]);
        window.location.reload(); // reloads page
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   *
   * @param {*} email
   * @param {*} e
   */
  deleteUser(email, e) {
    e.preventDefault();
    const params = {
      email: email
    };

    axios
      .post(DELETE_USER_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        alert(response.data["message"]);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let isAdmin;
    let setAdmin, unsetAdmin, deleteButton; // row with buttons to be displayed for everyone except current user (do not want user changing admin capabilities or deleting themselves)

    if (this.props.user.admin) {
      isAdmin = <th style={{ color: "green" }}>YES</th>;
      //console.log("user is admin");
    } else {
      isAdmin = <th> </th>;
      //console.log("user is not admin");
    }

    if (!(this.state.currentUser == this.props.user.email)) {
      setAdmin = (
        <th>
          <Button
            id={this.props.user.email}
            variant="outline-primary"
            size="sm"
            onClick={e => this.toggleAdmin(true, this.props.user.email, e)}
          >
            Set Admin
          </Button>
        </th>
      );
      unsetAdmin = (
        <th>
          <Button
            id={this.props.user.email}
            variant="outline-warning"
            size="sm"
            onClick={e => this.toggleAdmin(false, this.props.user.email, e)}
          >
            Unset Admin
          </Button>
        </th>
      );

      deleteButton = (
        <th>
          <Button
            id={this.props.user.email}
            variant="outline-danger"
            size="sm"
            onClick={e => this.deleteUser(this.props.user.email, e)}
          >
            Delete User
          </Button>
        </th>
      );
    } else {
      setAdmin = <th> </th>;
      unsetAdmin = <th> </th>;
      deleteButton = <th> </th>;
    }

    return (
      <tr>
        <th>{this.props.user.user_id}</th>
        <th>{this.props.user.email}</th>
        <th>{this.props.user.first_name}</th>
        <th>{this.props.user.last_name}</th>
        {isAdmin}
        <th>{this.props.user.template_count}</th>
        {setAdmin}
        {unsetAdmin}
        {deleteButton}
      </tr>
    );
  }
}
