import React from "react";
import './Editor.scss'

import GridLayout from 'react-grid-layout';
import { LEGEND } from "./EDITOR_CONSTANTS";
import {Textbox} from "./Components/textbox/textbox";

import {Button, Form,} from "react-bootstrap";

export default class Editor extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      gridElements: [],
      layout: [],
      activeElement: null,
      editElement: {}
    };

    this.generateItem = this.generateItem.bind(this);
    this.generateDOM = this.generateDOM.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.saveGrid = this.saveGrid.bind(this);
    this.loadGrid = this.loadGrid.bind(this);
    this.componentEditor = this.componentEditor.bind(this);
    this.layoutEditor = this.layoutEditor.bind(this);
    this.elementClicked = this.elementClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyChange = this.applyChange.bind(this);
  }

  generateItem(){
    // let item = {type: "Textbox", props: {content: {value: "hello world "}, key: this.state.gridElements.length + 1}};
    const typeName = "Textbox";
    const typeRef = LEGEND[typeName];
    // this is just assuming we never have key conflicts, if we do the page will break. TODO check for conflicts
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // it is important that props be added last, when parsing props the form generator will ignore the first two props (key and data-grid)
    //TODO generate component at the bottom of the page instead of inserting it near the top (x and y value)
    let item = {type: typeName, props: {key: key, "data-grid": {x: 0, y: 0, ...typeRef.gridOptions}, ...typeRef.props}};

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
    this.setState({layout: load.layout, gridElements: load.gridElements});
    console.log("Layout loaded");
  }

  generateDOM(){
    return(
      this.state.gridElements.map((element, index) => {
        return(
          React.createElement(LEGEND[element.type].type, {
            ...element.props,
            className: this.state.activeElement === index && 'react-grid-item-active',
            // "data-grid": {x:0, y:0, w:4, h:3, ...LEGEND[element.type].gridOptions},
            onClick: () => this.elementClicked(index)
          })
        )
      })
    )
  }

  elementClicked(index){
    //this.setState({activeElement: index}
    let editFields = {};
    for (let [key, value] of Object.entries(this.state.gridElements[index].props)){
      if(key !== "key" && key !== "data-grid"){
        editFields[key] = value.value;
      }
    }
    this.setState({activeElement: index, editElement: editFields});
  }

  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({editElement: {...prevState.editElement, [name]: value}}));
  }

  applyChange(){
    let changes = {...this.state.gridElements[this.state.activeElement].props};
    for(let [keyOld, valueOld] of Object.entries(this.state.gridElements[this.state.activeElement].props)){
      if(keyOld !== "key" && keyOld !== "data-grid"){
        for(let [keyNew, valueNew] of Object.entries(this.state.editElement)){
          if(keyOld === keyNew){
            changes[keyOld].value = valueNew;
          }
        }
      }
    }
    let copy = JSON.parse(JSON.stringify(this.state.gridElements));
    copy[this.state.activeElement].props = changes;
    this.setState({gridElements: copy, activeElement: null});
  }

  componentEditor(){
    const OBJ_TYPE = LEGEND[this.state.gridElements[this.state.activeElement].type];
    const ELEMENT = this.state.gridElements[this.state.activeElement];

    return(
      <div className={'editor-sidebar component-editor'}>
        <p className={'component-editor-close-button'} onClick={() => this.setState({activeElement: null})}>X</p>
        <Form onSubmit={e => {e.preventDefault(); this.applyChange()}} >
          {Object.keys(ELEMENT.props).map((key, index) => {
            if (index > 1){
              return(
                <Form.Group key={key + index}>
                  <Form.Label>{ELEMENT.props[key].name}</Form.Label>
                  <Form.Control
                    name={key}
                    value={this.state.editElement[key]}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              )
            }
          })}
        </Form>
        <Button variant={"outline-light"} onClick={this.applyChange}>APPLY</Button>
      </div>
    )
  }

  layoutEditor(){
    return(
      <div className={'editor-sidebar layout-editor'}>
        <h1>Components</h1>
        <p>This is where the components and options will be...</p>
        <button onClick={this.generateItem}>ADD NEW ELEMENT</button>
        <button onClick={this.saveGrid}>SAVE LAYOUT</button>
        <button onClick={this.loadGrid}>LOAD LAYOUT</button>
      </div>
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
        {this.state.activeElement === null ? this.layoutEditor() : this.componentEditor()}
      </div>
    )
  }
}