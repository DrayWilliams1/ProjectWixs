import React from "react";
import './Editor.scss'

import GridLayout from 'react-grid-layout';
import {LEGEND} from "./EDITOR_CONSTANTS";
import ComponentStyleBar from "./ComponentStyleBar";

import {Button, Form, Card, Container} from "react-bootstrap";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

//icons
import plus from "../assets/icons/plus.svg";
import close from "../assets/icons/other/028-cancel-1.svg";
import pencil from "../assets/icons/other/edit.svg";
import canvas from "../assets/icons/other2/113-canvas.svg";

export default class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabOpen: false,
      activeTab: null,
      gridElements: [],
      layout: [],
      activeElement: null,
      editStyle: null
    };

    this.generateItem = this.generateItem.bind(this);
    this.generateDOM = this.generateDOM.bind(this);
    this.saveGrid = this.saveGrid.bind(this);
    this.loadGrid = this.loadGrid.bind(this);
    this.componentEditor = this.componentEditor.bind(this);
    this.formGeneration = this.formGeneration.bind(this);
    this.layoutEditor = this.layoutEditor.bind(this);
    this.styleEditor = this.styleEditor.bind(this);
    this.elementClicked = this.elementClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resizePropArray = this.resizePropArray.bind(this);
    this.applyChange = this.applyChange.bind(this);
    this.getIcon = this.getIcon.bind(this);
    this.tabHandler = this.tabHandler.bind(this);

    this.slideWidth = '300px';
  }

  getIcon(iconName) {
    switch(iconName){
      case 'Textbox':
        return require('../assets/icons/simpleText-Icon.png');
      case 'RichTextbox':
        return require('../assets/icons/other/011-lines.svg');
      case 'ContentWithHeader':
        return require('../assets/icons/other/047-table.svg');
      case 'Button':
        return require('../assets/icons/other/093-right-arrow-2.svg');
    }
  }

  generateItem(typeName) {
    // let item = {type: "Textbox", props: {content: {value: "hello world "}, key: this.state.gridElements.length + 1}};
    const typeRef = LEGEND[typeName];
    let key;
    do {
      key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    } while (this.state.gridElements.length !== 0 && this.state.gridElements.filter(e => e.props.key === key).length > 0);

    // it is important that props be added last, when parsing props the form generator will ignore the first two props (key and data-grid)
    const height = this.state.layout.reduce((total, value) => {
      if (value.y + value.h > total) return (value.y + value.h);
      return total
    }, 0);
    let item = {
      type: typeName,
      props: {key: key, "data-grid": {x: 0, y: height, ...typeRef.gridOptions}, ...typeRef.props},
      style: {fontSize: "1em", fontColor: "#000", backgroundColor: "#fff"}
    };

    this.setState(prevState => ({gridElements: [...prevState.gridElements, item]}));
  }

  saveGrid() {
    const store = {gridElements: this.state.gridElements, layout: this.state.layout};
    localStorage.setItem("test-editor-store", JSON.stringify(store));
    console.log("Layout saved");
  }

  loadGrid() {
    const load = JSON.parse(localStorage.getItem("test-editor-store"));
    console.log(load);
    this.setState({layout: load.layout, gridElements: load.gridElements});
    console.log("Layout loaded");
  }

  generateDOM() {
    return (
      this.state.gridElements.map((element, index) => {
        return (
          React.createElement(LEGEND[element.type].type, {
            ...element.props,
            className: this.state.activeElement === index && 'react-grid-item-active',
            style: element.style,
            // "data-grid": {x:0, y:0, w:4, h:3, ...LEGEND[element.type].gridOptions},
            onClick: () => this.elementClicked(index)
          })
        )
      })
    )
  }

  elementClicked(index) {
    //this.setState({activeElement: index}
    const style = this.state.gridElements[index].style;
    let editFields = {};
    for (let [key, value] of Object.entries(this.state.gridElements[index].props)) {
      if (key !== "key" && key !== "data-grid") {
        editFields[key] = value.value;
      }
    }
    this.setState({activeElement: index, editElement: editFields, editStyle: style});
  }

  handleChange(e, index = undefined) {
    const name = e.target.name;
    const value = e.target.value;
    if (index === undefined) {
      this.setState(prevState => ({editElement: {...prevState.editElement, [name]: value}}));
    } else {
      let editCopy = JSON.parse(JSON.stringify(this.state.editElement));
      let temp = editCopy[name];
      for (let i = 0; i < index.length - 1; i++){
        temp = temp[index[i]]
      }
      temp[index[index.length - 1]] = value;
      // editCopy[name][index] = value;
      this.setState({editElement: editCopy});
    }
  }

  resizePropArray(e, schema, index) {
    const defaultValue = schema.schema.value;
    const name = e.target.name;
    const value = e.target.value;
    let editCopy = JSON.parse(JSON.stringify(this.state.editElement));
    let newArray = [];
    for (let i = 0; i < value; i++) {
      newArray.push(defaultValue);
    }
    if (index === undefined) {
      editCopy[name] = newArray;
    } else {
      let temp = editCopy[name];
      for (let i = 0; i < index.length - 1; i++){
        temp = temp[index[i]]
      }
      temp[index[index.length - 1]] = newArray;
      // editCopy[name][index] = newArray;
    }
    this.setState({editElement: editCopy});
  }

  applyChange() {
    let elements = JSON.parse(JSON.stringify(this.state.gridElements));
    for (let [keyOld, valueOld] of Object.entries(elements[this.state.activeElement].props)) {
      if (keyOld !== "key" && keyOld !== "data-grid") {
        for (let [keyNew, valueNew] of Object.entries(this.state.editElement)) {
          if (keyOld === keyNew) {
            elements[this.state.activeElement].props[keyOld].value = valueNew;
          }
        }
      }
    }
    this.setState({gridElements: elements});
  }

  recursiveAccess(obj, route){
    let temp = obj;
    for (let i = 0; i < route.length; i++){
      temp = temp[route[i]]
    }
    // console.log(route);
    // console.log(obj);
    // console.log(temp);

    return temp;
  }

  formGeneration(schema, key, index = undefined) {
    // console.log(this.state.editElement);
    // console.log(index);
    const inputType = {
      StringArea: "textarea",
      String: "input",
      Int: "input",
      Number: "input",
      // Boolean: "TODO",
      // Select: TODO,
    };

    if (["StringArea", "String", "Int", "Number"].includes(schema.type)) {
      return (
        <Form.Group key={key + index}>
          {index === undefined && <Form.Label>{schema.name}</Form.Label>}
          <Form.Control
            name={key}
            value={index === undefined ? this.state.editElement[key] : this.recursiveAccess(this.state.editElement[key], index)}
            onChange={index === undefined ? this.handleChange : (e) => this.handleChange(e, index)}
            as={inputType[schema.type]}
            type={(schema.type === "Int" || schema.type === "Number") ? "number" : undefined}
            step={schema.type === "Int" ? "1" : "any"}
            min={0}
          />
        </Form.Group>
      )
    } else if (schema.type === "RichText") {
      return (
        <Form.Group >
          {index === undefined && <Form.Label>{schema.name}</Form.Label>}
          <RichTextEditor
            content={index === undefined ? this.state.editElement[key] : this.state.editElement[key][index]}
            updateState={(e) => this.setState(prevState => ({
              editElement: {
                ...prevState.editElement,
                [key]: e
              }
            }))}
          />
        </Form.Group>
      )
    } else if (schema.type === "Array") {
      return (
        <Form.Group >
          <h2>{schema.name}</h2>
          <p>size</p>
          <Form.Control
            name={key}
            value={index === undefined ? this.state.editElement[key].length : this.state.editElement[key][index].length}
            onChange={(e) => this.resizePropArray(e, schema, index)}
            type={"Number"}
            step={"1"}
            min={schema.min}
            max={schema.max}
            size={'sm'}
            style={{marginBottom: '5px'}}
          />
          {
            index === undefined ?
              this.state.editElement[key].map((item, i) => {
                return (
                  this.formGeneration(schema.schema, key, [i])
                )
              })
              :
              this.recursiveAccess(this.state.editElement[key], index).map((item, i) => {
                return (
                  this.formGeneration(schema.schema, key, [...index, i])
                )
              })
          }
          {/*{this.formGeneration(schema.schema, key, 0)}*/}
        </Form.Group>
      )
    }
  }

  componentEditor() {
    const ELEMENT = this.state.gridElements[this.state.activeElement];
    return (
      <div>
        <img
          src={close}
          className={'component-editor-close-button'}
          onClick={() => this.setState({activeElement: null, activeTab: "layout"})}
        />
        <h1>Edit Data</h1>
        <Form onSubmit={e => {
          e.preventDefault();
          this.applyChange()
        }} className={"layout-editor-form-root"}>
          {Object.keys(ELEMENT.props).map((key, index) => {
            if (index > 1) {
              //check types and return form fields based on types
              //TEXTAREA, TEXT, INT, NUMBER
              return (this.formGeneration(ELEMENT.props[key], key))

            }
          })}
          <Button variant={"outline-light"} type={"submit"}>APPLY</Button>
        </Form>
      </div>
    )
  }

  layoutEditor() {
    return (
      <div>
        <h1>Components</h1>
        <Container className="editor-sidebar-grid">
        <div className="row">
        {Object.entries(LEGEND).map(([key, value]) => {
          return (
          <div key={'layout-editor-element-' + key} className="col-sm-6">
            <Card
            bg="light"
            style={{ height: "120px", width: "120px", cursor:"pointer"}}
            className="text-center"
            align="center"
            tag="a"
            title={value.desc}
            onClick={() => this.generateItem(key)}
            >
            <Card.Body>
              <Card.Img variant="top" src={this.getIcon(key)} className="card-images"/>
              <Card.Text>
                {value.title}
              </Card.Text>
            </Card.Body>
            </Card>
          </div>
          )
        })}

        <button onClick={this.saveGrid}>SAVE LAYOUT</button>
        <button onClick={this.loadGrid}>LOAD LAYOUT</button>
        </div>
        </Container>
      </div>
    )
  }

  styleEditor(){
    return(
      <div>
        <h1>style editing will go here</h1>
        <h2>Font Size</h2>

      </div>
    )
  }

  tabHandler(name){

    // if the tabs are open, check if clicking same tab then close, otherwise open clicked tab

    //if tabs are closed open tabs and set to clicked
    if(this.state.tabOpen){
      if(this.state.activeTab === name){
        this.setState({tabOpen: false});
      }else{
        this.setState({activeTab: name})
      }
    }else{
      this.setState({tabOpen: true, activeTab: name});
    }
  }

  render() {
    return (
      <div className={'editor-container'} style={{marginRight: this.state.tabOpen ? '300px' : 0}}>
        <GridLayout
          className="editor-grid"
          layout={this.state.layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={(l) => this.setState({layout: l})}
          compactType={null}
          preventCollision={true}
          margin={[1, 1]}
        >
          {this.generateDOM()}
        </GridLayout>
        <div className={"editor-handles-container"} style={{right: this.state.tabOpen ? this.slideWidth : undefined}}>
          <div className={"editor-handle editor-handle-layout"}>
            <img
              style={{transform: this.state.tabOpen ? 'rotate(45deg)' : undefined}}
              src={plus}
              onClick={() => this.tabHandler("layout")}
            />
          </div>
          {this.state.activeElement !== null &&
          <div className={"editor-handle editor-handle-component"}>
            <img
              src={pencil}
              onClick={() => this.tabHandler("component")}
            />
          </div>}
          {this.state.activeElement !== null &&
          <div className={"editor-handle editor-handle-style"}>
            <img
              src={canvas}
              onClick={() => this.tabHandler("style")}
            />
          </div>
          }

        </div>

        <div
          className={[
            'editor-sidebar',
            this.state.activeTab === "layout" && "editor-sidebar-layout",
            this.state.activeTab === "component" && "editor-sidebar-component",
            this.state.activeTab === "style" && "editor-sidebar-style",
          ].join(" ")}
          style={{
            left: this.state.tabOpen ? 'calc(100% - 300px)' : '100%',
            boxShadow: this.state.tabOpen ? '0 0 20px rgba(54, 58, 64, 0.55)' : 'none'
          }}
        >
          {this.state.activeTab === "layout" && this.layoutEditor()}
          {this.state.activeTab === "component" && this.componentEditor()}
          {this.state.activeTab === "style" && this.styleEditor()}
        </div>
      </div>
    )
  }
}