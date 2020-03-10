import React, {Component} from 'react';
import "./textbox.scss";

import {Editor as DraftEditor, EditorState as DraftEditorState} from 'draft-js';
import RichTextDisplay from "../RichTextDisplay";


export class Textbox extends Component {

  constructor(props) {
    super(props);
    // console.log(this.props);
  }


  render() {
    return (
      <div {...this.props} className={[this.props.className, "textbox-style"].join(' ')}>
        {this.props.children}
        <RichTextDisplay content={this.props.content.value} />
      </div>

    );
  }
}

// legend information
export const SCHEMA = {
  type: Textbox,
  gridOptions: {h: 2, w: 4, minW: 2, minH: 2 },     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  props: {
    content: {
      type: "RichText",
      name: "Content",
      value: DraftEditorState.createEmpty(),
      desc: "Text to be displayed.",
    }
  }
};