import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import RichTextDisplay from "../RichTextDisplay";
import "./FlexCard.scss";

export class FlexCard extends Component {
  render() {
    return (
      <div {...this.props} className={[this.props.className].join(' ')} style={{...this.props.style, backgroundColor: 'transparent'}}>
        {this.props.children}
        <Card className={'editor-flex-card'} style={{backgroundColor: this.props.style.backgroundColor}}>
          <Card.Img varient={'teop'} src={this.props.image.value} className={'editor-flex-card-image'}/>
          {this.props.header.value !== "" && <Card.Header>{this.props.header.value}</Card.Header>}
          <Card.Body>
            <RichTextDisplay content={this.props.body.value} />
          </Card.Body>
          {this.props.footer.value !== "" && <Card.Footer>{this.props.footer.value}</Card.Footer>}
        </Card>
      </div>
    );
  }
}

// legend information
export const SCHEMA = {
  type: FlexCard,
  gridOptions: {h: 5, w: 3, minW: 2, minH: 4},     // grid options parameters: minW, maxW, minH, maxH, isDraggable, isResizable, static
  title: "Flexible Card",
  desc: "A Flexible Card that Includes an Image, Header, Body, and Footer sections",
  iconPathName: require('../../../assets/icons/other/card.svg'),
  props: {
    image: {
      type: "Image",
      name: "Display Image",
      value: "",
    },
    header: {
      type: "String",
      name: "Header",
      value: ""
    },
    body: {
      type: "RichText",
      name: "Card Body",
      value: null,
    },
    footer: {
      type: "String",
      name: "Footer",
      value: ""
    },
  }
};