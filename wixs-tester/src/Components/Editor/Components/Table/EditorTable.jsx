import React, {Component} from 'react';

export class EditorTable extends Component {
  render() {
    // console.log(this.props.content);
    return (
      <div {...this.props} className={[this.props.className].join(' ')}>
        {this.props.children}
        {this.props.content.value.map(item => {
          return(<p>item</p>)
        })}
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: EditorTable,
  gridOptions: {h: 2, w: 4, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Text Area",
  desc: "Tables of all sizes",
  props: {
    content: {
      type: "Array",
      name: "Array 1",
      schema: {
        type: "String",
        name: "test array",
        value: "default value",
        desc: "this is a description"
      },
      value: []
    }
  }
};