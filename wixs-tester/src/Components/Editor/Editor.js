import React from "react";
import './Editor.scss'

import GridLayout from 'react-grid-layout';
import { LEGEND } from "./EDITOR_CONSTANTS";

export default class Editor extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      gridElements: [],
      layout: [],
    };

    this.generateItem = this.generateItem.bind(this);
    this.generateDOM = this.generateDOM.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.saveGrid = this.saveGrid.bind(this);
    this.loadGrid = this.loadGrid.bind(this);
  }

  generateItem(){
    let item = {type: "Textbox", props: {content: "hello world " + this.state.gridElements.length, key: this.state.gridElements.length + 1}};
    this.setState(prevState => ({gridElements: [...prevState.gridElements, item]}));
  }

  updateLayout(layout){
    this.setState(prevState => ({layout: layout}))
  }

  saveGrid(){
    const store = {gridElements: this.state.gridElements, layout: this.state.layout};
    localStorage.setItem("test-editor-store", JSON.stringify(store));
    console.log("Layout saved");
  }

  loadGrid(){
    const load = JSON.parse(localStorage.getItem("test-editor-store"));
    console.log(load);
    this.setState({layout: load.layout, gridElements: load.gridElements});
    console.log("Layout loaded");
  }

  generateDOM(){
    return(
      this.state.gridElements.map(element => {
        return(
          React.createElement(LEGEND[element.type].type, {
            ...element.props,
            "data-grid": {x:0, y:0, w:4, h:3, ...LEGEND[element.type].gridOptions}
          })
        )
      })
    )
  }

  render(){
    return(
      <div className={'editor-container'}>
        <GridLayout
          className="editor-grid"
          layout={this.state.layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={(l) => this.updateLayout(l)}
          compactType={null}
          preventCollision={true}
        >
          {this.generateDOM()}
        </GridLayout>
        <div className={'editor-sidebar'}>
          <h1>Components</h1>
          <p>This is where the components and options will be...</p>
          <button onClick={this.generateItem}>ADD NEW ELEMENT</button>
          <button onClick={this.saveGrid}>SAVE LAYOUT</button>
          <button onClick={this.loadGrid}>LOAD LAYOUT</button>
        </div>
      </div>
    )
  }
}