import React, {Component} from 'react';
import "./RawHTMLBox.scss";

export class RawHTMLBox extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "rawHTMLBox-style"].join(' ')}>
        {this.props.children}
        <div dangerouslySetInnerHTML={{ __html: this.props.content.value }} />
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: RawHTMLBox,
  gridOptions: {h: 2, w: 2, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "HTML box",
  desc: "A box to allow for raw html code",
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "Code goes here",
    }
  }
};