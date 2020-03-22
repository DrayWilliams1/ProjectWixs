import React, { Component } from "react";
import axios from "axios"; //AJAX call to PHP file
import Table from "react-bootstrap/Table";
import qs from "qs"; // for packaging details collected from the form

const GET_ALL_USERS_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUserAdmin.php";
const CHECK_IS_ADMIN =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/isAdmin.php";

import "./sass/AdminPage.scss";
import auth from "/auth.js";
import { Container } from "react-bootstrap";
import CustomTableRow from "./CustomTableRow.js";

export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      users: [], // the array containing all the users to be displayed
      isAdmin: true,
      isAuthenticated: false
    };

    this.isAdmin = this.isAdmin.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  /**
   * Returns whether the currently signed in user has administrator permissions
   *
   * @return boolean true if the user is an admin, false if not
   */
  isAdmin() {
    var currentUser = auth.getCookie("user");

    if (currentUser) {
      const params = {
        email: currentUser
      };

      axios
        .post(CHECK_IS_ADMIN, qs.stringify(params))
        .then(response => {
          console.log(response);

          if (response.data["success"] === true) {
            // script success
            if (response.data["isAdmin"] === true) {
              // user is an admin
              this.setState({
                isAdmin: true
              });
            } else {
              // user is not an admin
              this.setState({
                isAdmin: false
              });
            }
          } else {
            // script failure
            console.log(response.data["message"]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  /**
   * Returns all the users contained within the database so they can be displayed
   */
  getAllUsers() {
    axios
      .post(GET_ALL_USERS_URL)
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
          // successfully obtained system users
          this.setState({
            users: response.data["users"]
          });
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Executes when the component has rendered
   */
  componentDidMount() {
    this.isAdmin();
    this.getAllUsers();
  }

  render() {
    if (!this.state.isAdmin) {
      this.props.history.push("/"); // redirects to the home page if user is not an admin
    }

    return (
      <div>
        <Container>
          <h1>Admin Options</h1>
        </Container>

        <Container>
          <h2>ProjectWixs Userbase</h2>
          <Table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>E-mail Address</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Admin</th>
                <th># of Templates</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, i) => (
                <CustomTableRow user={user} key={i} />
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
