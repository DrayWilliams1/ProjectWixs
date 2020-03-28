import React, {Component} from 'react';
import PropTypes from "prop-types";
import "draft-js-static-toolbar-plugin/lib/plugin.css";

import {
  // Editor as DraftEditor,
  EditorState as DraftEditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons'

import Editor from "draft-js-plugins-editor";
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

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
    this.toolbarPlugin = createToolbarPlugin();
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
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={(e) => {
            this.setState({editorState: e});
            this.props.updateState(convertToRaw(e.getCurrentContent()))
          }}
          plugins={plugins}
        />
        <Toolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <Separator {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
              </div>
            )
          }
        </Toolbar>
      </div>
    );
  }
}

RichTextDisplay.propTypes = {
  content: PropTypes.any.isRequired
};

export default RichTextEditor;