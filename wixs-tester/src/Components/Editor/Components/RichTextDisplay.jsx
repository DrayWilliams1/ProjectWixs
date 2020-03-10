import React, {Component} from 'react';

import {Editor as DraftEditor } from 'draft-js';

import "./RichTextDisplay.scss";

class RichTextDisplay extends Component {

  render() {
    console.log(this.props.content);
    return (
      <DraftEditor editorState={this.props.content} readOnly={true} onChange={(e) => console.log("HELP ME IM SINKING")}/>
    );
  }
}

export default RichTextDisplay;