import React, { Component } from "react";
import axios from "axios"; //AJAX call to PHP file
import Table from "react-bootstrap/Table";
import qs from "qs"; // for packaging details collected from the form

const IS_USER_ADMIN_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/isAdmin.php";
const GET_ALL_USERS_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUserAdmin.php";

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
      isAdmin: false
    };

    this.isAdmin = this.isAdmin.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  /**
   * Returns whether the user is an admin or not
   */
  isAdmin() {
    this.setState({
      isAdmin: true
    });

    return true;

    // Will eventually do axios call to see if user with this email is admin and set the state to reflect the answer
  }

  /**
   * Retrieves the currently signed in user from the database
   */
  getUser() {}

  /**
   * Returns all the users contained within the database so they can be displayed
   */
  getAllUsers() {
    axios
      .post(GET_ALL_USERS_URL)
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
          this.setState({
            users: response.data["users"]
          });

          // TODO: get users from response.data['users'] and set the users variable in state to it.
          // Then use the .map function in render to produce the same table you did before but with the real data
          // Reference cameron's DashboardPage to see how to dynamically create the data
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
    this.getUser();
    this.getAllUsers();
    this.isAdmin();
  }

  render() {
    const isAuthenticated = auth.isAuthenticated();
    var currentUser = auth.getCookie("user");
    let greeting;

    let adminTest;

    if (this.state.isAdmin) {
      // will eventually just redirect if user is not an admin, this is a tester
      adminTest = <p>You are an admin</p>;
    } else {
      adminTest = <p>You are not an admin</p>;
    }

    if (isAuthenticated) {
      greeting = (
        <h1>
          Welcome back, <i>{currentUser}</i>.
        </h1>
      );
    } else {
      greeting = <h1>Hello asshole</h1>;
    }
    
    return (
      <div>
        <Container>
          <div className="word-content">{greeting}</div>
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
              {this.state.users.map((user, i) => (<CustomTableRow user={user} key={i} />))}
            </tbody>
          
          </Table>
          
        </Container>
      </div>
    );
  }
}
