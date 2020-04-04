import React, {Component} from 'react';
import RichTextDisplay from "../RichTextDisplay";

import "./ContentWithHeader.scss";

export class ContentWithHeader extends Component {
  render() {
    return (
      <div {...this.props} className={[this.props.className].join(' ')}>
        {this.props.children}
        <div className={"content-with-header-container"}>
          <h1 className={'content-with-header-header'}>{this.props.header.value}</h1>
          <div>
            <RichTextDisplay content={this.props.content.value} />
          </div>
        </div>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: ContentWithHeader,
  gridOptions: {h: 4, w: 4, minW: 2, minH: 3},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Text with Header",
  desc: "Rich text with a fatty header",
  iconPathName: require('../../../assets/icons/other/032-spreadsheet-7.svg'),
  props: {
    header:{
      type: "String",
      name: "Header",
      value: "",
    },
    content: {
      type: "RichText",
      name: "Body",
      value: null,
    }
  }
};