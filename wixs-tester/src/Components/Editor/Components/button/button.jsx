import React, {Component} from 'react';
import "./button.scss";

export class Button extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "button-style"].join(' ')}>
        {this.props.children}
        <button>{this.props.content.value}</button>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: Button,
  gridOptions: {h: 2, w: 2, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Button",
  desc: "A Standard Button",
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "Button",
    }
  }
};