import React, {Component} from 'react';
import {Table} from "react-bootstrap";

export class EditorTable extends Component {
  render() {
    let transposed = this.props.content.value[0].map((col, i) => this.props.content.value.map(row => row[i]));
    transposed = transposed.slice(1,);
    return (
      <div {...this.props} className={[this.props.className].join(' ')}>
        {this.props.children}
        <Table>
          <thead>
          <tr>
            {this.props.content.value.map((item, index) => <th key={"heading" + index}>{item[0]}</th>)}
          </tr>
          </thead>
          <tbody>
          {transposed.map((items) => {
            return(
              <tr>
                {items.map((item) => <td>{item}</td>)}
              </tr>
            )
          })}
          </tbody>
        </Table>
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
  title: "Table",
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