import React, {Component} from 'react';
import "./StandardButton.scss";

export class StandardButton extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "StandardButton-style"].join(' ')}>
        {this.props.children}
        <button>{this.props.content.value}</button>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: StandardButton,
  gridOptions: {h: 2, w: 2, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Button",
  desc: "A Standard Button",
  iconPathName: require('../../../assets/icons/other/093-right-arrow-2.svg'),
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "Button",
    }
  }
};