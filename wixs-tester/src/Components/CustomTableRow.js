// Dependencies
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
// CSS/SASS
import "./sass/CustomTableRow.scss";
/**
 * Purpose: This is a file displaying a photo or video element depending on the props sent to it
 */
export default class CustomTableRow extends Component {
  constructor(props) {
    super(props);
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
        <th><Button variant='outline-warning' size='sm'>Toggle Admin</Button></th>
        <th><Button variant='outline-danger' size='sm'>Delete</Button></th>
        </tr>
    )}
}