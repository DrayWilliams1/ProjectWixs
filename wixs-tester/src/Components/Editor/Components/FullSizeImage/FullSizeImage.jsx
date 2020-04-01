import React, {Component} from 'react';
import "./FullSizeImage.scss";

export class FullSizeImage extends Component {

  render() {
    return (
      <div {...this.props} className={[this.props.className, "FullSizeImage-style"].join(' ')}>
        {this.props.children}
        <p className={"FullSizeImage-top-text"} >{this.props.topText.value}</p>
        <p className={"FullSizeImage-mid-text"} >{this.props.midText.value}</p>
        <img className={"FullSizeImage-image"} src={this.props.image.value}/>
        <p className={"FullSizeImage-bottom-text"} >{this.props.bottomText.value}</p>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: FullSizeImage,
  gridOptions: {h: 2, w: 2, minW: 1, minH: 1},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Image",
  desc: "A simple image container",
  iconPathName: require('../../../assets/icons/other/photo.svg'),
  props: {
    image: {
      type: "Image",
      name: "Display Image",
      value: "",
    },
    topText: {
      type: "String",
      name: "Top Text",
      value: ""
    },
    midText: {
      type: "String",
      name: "Overlay Text",
      value: ""
    },
    bottomText: {
      type: "String",
      name: "Bottom Text",
      value: ""
    },
  }
};