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
    let key;
    do {
      key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }while(this.state.gridElements.length !== 0 && this.state.gridElements.filter(e => e.props.key === key).length > 0);

    // it is important that props be added last, when parsing props the form generator will ignore the first two props (key and data-grid)
    const height = this.state.layout.reduce((total, value) => {
      if(value.y + value.h > total) return(value.y + value.h);
      return total
    }, 0);
    let item = {type: typeName, props: {key: key, "data-grid": {x: 0, y: height, ...typeRef.gridOptions}, ...typeRef.props}};

    this.setState(prevState => ({gridElements: [...prevState.gridElements, item]}));
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
    let elements = JSON.parse(JSON.stringify(this.state.gridElements));
    for(let [keyOld, valueOld] of Object.entries(elements[this.state.activeElement].props)){
      if(keyOld !== "key" && keyOld !== "data-grid"){
        for(let [keyNew, valueNew] of Object.entries(this.state.editElement)){
          if(keyOld === keyNew){
            elements[this.state.activeElement].props[keyOld].value = valueNew;
          }
        }
      }
    }
    this.setState({gridElements: elements, activeElement: null});
  }

  componentEditor(){
    const OBJ_TYPE = LEGEND[this.state.gridElements[this.state.activeElement].type];
    const ELEMENT = this.state.gridElements[this.state.activeElement];
    const inputType = {
      StringArea: "textarea",
      String: "input",
      Int: "input",
      Number: "input",
      // Boolean: "TODO",
    };

    console.log(ELEMENT);
    console.log(ELEMENT.props["content"].type === "Int" && "1");
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
                    as={inputType[ELEMENT.props[key].type]}
                    type={(ELEMENT.props[key].type === "Int" || ELEMENT.props[key].type === "Number") ? "number" : undefined}
                    step={ELEMENT.props[key].type === "Int" ? "1" : "any"}
                    min={0}
                  />
                </Form.Group>
              )
            }
          })}
          <Button variant={"outline-light"} type={"submit"}>APPLY</Button>
        </Form>
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
    //TODO make this sorta responsive so it works on more screen sizes
    return(
      <div className={'editor-container'}>
        <GridLayout
          className="editor-grid"
          layout={this.state.layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={(l) => this.setState({layout: l})}
          compactType={null}
          preventCollision={true}
          margin={[1,1]}
        >
          {this.generateDOM()}
        </GridLayout>
        {this.state.activeElement === null ? this.layoutEditor() : this.componentEditor()}
      </div>
    )
  }
}