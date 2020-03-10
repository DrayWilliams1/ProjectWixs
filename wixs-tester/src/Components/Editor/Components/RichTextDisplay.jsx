import React, {Component} from 'react';

import {Editor as DraftEditor, convertFromRaw, EditorState} from 'draft-js';

import "./RichTextDisplay.scss";

class RichTextDisplay extends Component {

  render() {
    let editorState;
    if (this.props.content !== null) {
      editorState = EditorState.createWithContent(convertFromRaw(this.props.content));
    } else {
      editorState = EditorState.createEmpty();
    }

    return (
      <DraftEditor editorState={editorState} readOnly={true} onChange={(e) => console.log("HELP ME IM SINKING")}/>
    );
  }
}

export default RichTextDisplay;