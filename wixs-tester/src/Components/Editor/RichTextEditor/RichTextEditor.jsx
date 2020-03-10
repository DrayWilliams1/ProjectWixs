import React, {Component} from 'react';
import PropTypes from "prop-types";

import {
  Editor as DraftEditor,
  EditorState as DraftEditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import "./RichTextEditor.scss"
import RichTextDisplay from "../Components/RichTextDisplay";

class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    if (this.props.content !== null) {
      const contentState = convertFromRaw(this.props.content);
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

RichTextDisplay.propTypes = {
  content: PropTypes.any.isRequired
};

export default RichTextEditor;