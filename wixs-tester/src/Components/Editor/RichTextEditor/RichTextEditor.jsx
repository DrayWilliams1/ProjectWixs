import React, {Component} from 'react';

import {
  Editor as DraftEditor,
  EditorState as DraftEditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import "./RichTextEditor.scss"

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    if (this.props.initialState !== null) {
      const contentState = convertFromRaw(this.props.initialState);
      this.state = {editorState: DraftEditorState.createWithContent(contentState)}
    } else {
      this.state = {editorState: DraftEditorState.createEmpty()}
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.setState({editorState: newState});
      return "handled"
    } else {
      return "not-handled"
    }
  }


  render() {
    return (
      <div>
        <DraftEditor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={(e) => {
            this.setState({editorState: e});
            this.props.updateState(convertToRaw(e.getCurrentContent()))
          }}
        />
      </div>
    );
  }
}