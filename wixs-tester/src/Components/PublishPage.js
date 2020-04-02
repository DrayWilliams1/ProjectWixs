import React, {Component} from 'react';
import GridLayout from "react-grid-layout";
import {LEGEND} from "./Editor/EDITOR_CONSTANTS";

class PublishPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gridElements: [],
      layout: [],
    };

    this.loadGrid = this.loadGrid.bind(this);
  }


  loadGrid() {
    // Put AXIOS call here and set these state values
    this.setState({
      layout: load.layout,
      gridElements: load.gridElements,
    });
  }

  generateDOM() {
    return this.state.gridElements.map((element, index) => {
      return React.createElement(LEGEND[element.type].type, {
        ...element.props,
        style: element.style,
      });
    });
  }


  render() {
    return (
      <div className={"publish-container"}>
        <GridLayout
          className="editor-grid"
          layout={this.state.layout}
          cols={12}
          rowHeight={30}
          width={1200}
          compactType={null}
          preventCollision={true}
          margin={[1, 1]}
          isDraggable={false}
          isResizable={false}
        >
          {this.generateDOM()}
        </GridLayout>
      </div>
    );
  }
}

export default PublishPage;