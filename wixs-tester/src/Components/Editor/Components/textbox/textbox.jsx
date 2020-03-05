import React, {Component} from 'react';
import "./textbox.scss";

export class Textbox extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "textbox-style"].join(' ')}>
        {this.props.children}
        <p>{this.props.content}</p>
      </div>

    );
  }
}

// legend information
export const LegendInfo = {
  type: Textbox,
  gridOptions: {minW: 2, minH: 2 },     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  props: {
    content: {type: "Object", desc: "This will the the text that is displayed in the box."}   //The type can either be "Object" or "Array" to support all use cases.
  }
};