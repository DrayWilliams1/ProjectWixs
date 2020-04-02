import React, {Component} from 'react';
import "./StandardButton.scss";

export class StandardButton extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "standardButton-style"].join(' ')}>
        {this.props.children}
        <input type="button" class="button" value={this.props.content.value}></input>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: StandardButton,
  gridOptions: {h: 2.5, w: 1.5, minW: 1.5, minH: 2.5},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
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