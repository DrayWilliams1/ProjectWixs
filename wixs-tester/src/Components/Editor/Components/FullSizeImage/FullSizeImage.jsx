import React, {Component} from 'react';
import "./FullSizeImage.scss";

export class FullSizeImage extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "FullSizeImage-style"].join(' ')}>
        {this.props.children}
        <img className={"FullSizeImage-image"} src={this.props.image.value}/>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: FullSizeImage,
  gridOptions: {h: 2, w: 2, minW: 2, minH: 2},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Image",
  desc: "A simple image container",
  iconPathName: require('../../../assets/icons/other/photo.svg'),
  props: {
    image: {
      type: "Image",
      name: "Display Image",
      value: "",
    }
  }
};