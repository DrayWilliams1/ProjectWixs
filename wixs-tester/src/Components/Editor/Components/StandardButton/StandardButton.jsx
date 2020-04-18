import React, {Component} from 'react';
import "./StandardButton.scss";

export class StandardButton extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "standardButton-style"].join(' ')}
           style={{...this.props.style, backgroundColor: 'transparent'}}>
        {this.props.children}
        <input
          type="button"
          className="button"
          value={this.props.content.value}
          style={{
            backgroundColor: this.props.style.backgroundColor,
            color: this.props.style.color,
            fontSize: this.props.style.fontSize
          }}
        />
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: StandardButton,
  gridOptions: {h: 2, w: 2, minW: 1, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Button",
  desc: "A Standard Button",
  iconPathName: require('../../../assets/icons/other/093-right-arrow-2.svg'),
  style: {fontSize: "1em", color: "#ffffff", backgroundColor: "#3f7dff"},
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "Button",
    }
  }
};