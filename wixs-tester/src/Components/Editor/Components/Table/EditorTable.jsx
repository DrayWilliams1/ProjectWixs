import React, {Component} from 'react';

export class EditorTable extends Component {
  render() {
    // console.log(this.props.content);
    return (
      <div {...this.props} className={[this.props.className].join(' ')}>
        {this.props.children}
        {/*{this.props.content.value.map(item => {*/}
        {/*  return(<p>{item}</p>)*/}
        {/*})}*/}
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: EditorTable,
  gridOptions: {h: 5, w: 5, minW: 4, minH: 4},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Text Area",
  desc: "Tables of all sizes",
  props: {
    content: {
      type: "Array",
      min: 1,
      max: 5,
      name: "Columns",
      schema: {
        type: "Array",
        min: 1,
        max: 5,
        name: "Data",
        schema: {
          type: "String",
          name: "column data",
          value: ""
        },
        value: [""]
      },
      value: [[""]]
    }
  }
};