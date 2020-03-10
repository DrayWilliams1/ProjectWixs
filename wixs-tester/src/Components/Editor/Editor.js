import React from "react";
import './Editor.scss'

import GridLayout from 'react-grid-layout';
import {LEGEND} from "./EDITOR_CONSTANTS";
import {Textbox} from "./Components/textbox/textbox";

import {Button, Form,} from "react-bootstrap";

//icons
import plus from "../assets/icons/plus.svg"
import close from "../assets/icons/other/028-cancel-1.svg"

import RichTextEditor from "./RichTextEditor/RichTextEditor";

export default class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabOpen: false,
      gridElements: [],
      layout: [],
      activeElement: null,
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

    this.slideWidth = '300px';
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
      props: {key: key, "data-grid": {x: 0, y: height, ...typeRef.gridOptions}, ...typeRef.props}
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
            // "data-grid": {x:0, y:0, w:4, h:3, ...LEGEND[element.type].gridOptions},
            onClick: () => this.elementClicked(index)
          })
        )
      })
    )
  }

  elementClicked(index) {
    //this.setState({activeElement: index}
    let editFields = {};
    for (let [key, value] of Object.entries(this.state.gridElements[index].props)) {
      if (key !== "key" && key !== "data-grid") {
        editFields[key] = value.value;
      }
    }
    this.setState({activeElement: index, editElement: editFields});
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({editElement: {...prevState.editElement, [name]: value}}));
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
    this.setState({gridElements: elements, activeElement: null});
  }

  componentEditor() {
    const OBJ_TYPE = LEGEND[this.state.gridElements[this.state.activeElement].type];
    const ELEMENT = this.state.gridElements[this.state.activeElement];
    const inputType = {
      StringArea: "textarea",
      String: "input",
      Int: "input",
      Number: "input",
      // Boolean: "TODO",
    };

    return (
      <div
        className={'editor-sidebar component-editor'}
        style={{
          left: this.state.tabOpen ? 'calc(100% - 300px)' : '100%',
          boxShadow: this.state.tabOpen ? '0 0 20px rgba(54, 58, 64, 0.55)' : 'none'
        }}
      >
        <img
          src={close}
          className={'component-editor-close-button'}
          onClick={() => this.setState({activeElement: null})}
        />
        <Form onSubmit={e => {
          e.preventDefault();
          this.applyChange()
        }} className={"layout-editor-form-root"}>
          {Object.keys(ELEMENT.props).map((key, index) => {
            if (index > 1) {
              //check types and return form fields based on types
              //TEXTAREA, TEXT, INT, NUMBER
              if (["StringArea", "String", "Int", "Number"].includes(ELEMENT.props[key].type)) {
                return (
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
              } else if (ELEMENT.props[key].type === "RichText") {
                return (
                  <Form.Group>
                    <Form.Label>{ELEMENT.props[key].name}</Form.Label>
                    <RichTextEditor
                      key={key + index}
                      content={this.state.editElement[key]}
                      updateState={(e) => this.setState(prevState => ({
                        editElement: {
                          ...prevState.editElement,
                          [key]: e
                        }
                      }))}
                    />
                  </Form.Group>
                )
              }

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
        <div
          className={'editor-sidebar layout-editor'}
          style={{
            left: this.state.tabOpen ? 'calc(100% - 300px)' : '100%',
            boxShadow: this.state.tabOpen ? '0 0 20px rgba(54, 58, 64, 0.55)' : 'none'
          }}
        >
          <h1>Components</h1>
          {Object.entries(LEGEND).map(([key, value]) => {
            return (
              <div>
                <Button onClick={() => this.generateItem(key)}>{key}</Button>
                <p className={'layout-editor-component-subtext'}>{value.desc}</p>
              </div>
            )
          })}
          <button onClick={this.saveGrid}>SAVE LAYOUT</button>
          <button onClick={this.loadGrid}>LOAD LAYOUT</button>
        </div>
      </div>
    )
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
        <div
          className={['editor-handle', this.state.activeElement === null ? 'layout-editor-handle' : 'component-editor-handle'].join(' ')}
          style={{right: this.state.tabOpen ? this.slideWidth : undefined}}>
          <img
            src={plus}
            onClick={() => this.setState(prevState => ({tabOpen: !prevState.tabOpen}))}
          />
        </div>
        {this.state.activeElement === null ? this.layoutEditor() : this.componentEditor()}
      </div>
    )
  }
}