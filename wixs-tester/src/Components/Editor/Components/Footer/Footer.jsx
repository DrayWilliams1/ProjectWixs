import React, {Component} from 'react';
import "./Footer.scss";

export class Footer extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "Footer-style"].join(' ')}>
        {this.props.children}
        <footer>
        <p>	&#169;{this.props.content.value}</p>
        </footer>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: Footer,
  gridOptions: {h: 2, w: 2, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Standard Footer",
  desc: "Create a Footer",
  iconPathName: require('../../../assets/icons/other/001-selection.svg'),
  props: {
    content: {
      type: "StringArea",
      name: "Content",
      value: "",
    }
  }
};