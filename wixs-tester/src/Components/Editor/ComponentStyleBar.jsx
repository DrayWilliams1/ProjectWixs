import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import "./ComponentStyleBar.scss";

class ComponentStyleBar extends Component {
  render() {
    return (
      <div className={"editorComponentStyleBar"} style={{left: this.props.left, right: this.props.right, display: this.props.display}}>
        {/*<Form>*/}
        {/*  <Form.Group>*/}
        {/*    <Form.Control as={"select"}>*/}
        {/*      <option>Smaller</option>*/}
        {/*      <option>Small</option>*/}
        {/*      <option>Normal</option>*/}
        {/*      <option>Large</option>*/}
        {/*      <option>Larger</option>*/}
        {/*    </Form.Control>*/}
        {/*  </Form.Group>*/}
        {/*</Form>*/}
        <div className={"editorComponentStyleBarFontSize"}>
          <img src={require("../assets/icons/other/FontUp.png")} />
        </div>
        <div className={"editorComponentStyleBarFontSize"}>
          <img src={require("../assets/icons/other/FontDown.png")} />
        </div>
      </div>
    );
  }
}

export default ComponentStyleBar;