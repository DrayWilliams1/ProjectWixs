import React, {Component} from 'react';
import "./Header.scss";

export class Header extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "Header-style"].join(' ')}>
        {this.props.children}
        <h1>{this.props.content.value}</h1>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: Header,
  gridOptions: {h: 2, w: 2, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Standard Header",
  desc: "Create a Header",
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "",
    }
  }
};