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

    //const pkey = props.content["key"];
    //console.log("pkey: " + this.props.key);
    //console.log("template: " + this.props.template);
    //const ptemplate = props.content["template"];
    //const ptype = template.is_active;

    this.state = {
        user: this.props.user,
        admin: this.props.user.admin
    }

  }
  render() {
      let isAdmin;
      if(this.state.user.admin){
          isAdmin = (<th style={{ color: 'green'}}>YES</th>);
          console.log("user is admin");
      }
      else{
          isAdmin = (<th> </th>);
          console.log("user is not admin");
        }
    return (
        <tr>
        <th>{this.state.user.user_id}</th>
        <th>{this.state.user.email}</th>
        <th>{this.state.user.first_name}</th>
        <th>{this.state.user.last_name}</th>
        {isAdmin}
        <th>{this.state.user.template_count}</th>
        <th><Button variant='outline-warning' size='sm'>Toggle Admin</Button></th>
        <th><Button variant='outline-danger' size='sm'>Delete</Button></th>
        </tr>
    )}
}