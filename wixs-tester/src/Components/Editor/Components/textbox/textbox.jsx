import React, {Component} from 'react';
import "./textbox.scss";

import {Editor as DraftEditor, EditorState as DraftEditorState, convertToRaw, convertFromRaw} from 'draft-js';
import RichTextDisplay from "../RichTextDisplay";


export class Textbox extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "textbox-style"].join(' ')}>
        {this.props.children}
        <RichTextDisplay content={this.props.content.value}/>
      </div>

    );
  }
}

// legend information
export const SCHEMA = {
  type: Textbox,
  gridOptions: {h: 2, w: 4, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  props: {
    content: {
      type: "RichText",
      name: "Content",
      value: null,
      desc: "Text to be displayed.",
    }
  }
};