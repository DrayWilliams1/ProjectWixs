import React, {Component} from 'react';
import "./textbox.scss";

export class Textbox extends Component {

  render() {
    // console.log(this.props.content);
    return (
      <div {...this.props} className={[this.props.className, "textbox-style"].join(' ')}>
        {this.props.children}
        <p>{this.props.content.value}</p>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: Textbox,
  gridOptions: {h: 2, w: 4, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Plain Text Area",
  desc: "A simple text component with no styling",
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "",
    }
  }
};