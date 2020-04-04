import React from "react";
import "./Editor.scss";

import GridLayout from "react-grid-layout";
import { LEGEND } from "./EDITOR_CONSTANTS";

import {Button, Form, Card, Container, Spinner} from "react-bootstrap";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import { ChromePicker } from "react-color";
import axios from "axios";
import auth from "/auth.js";
import qs from "qs"; // for packaging details collected from the form

//icons
import plus from "../assets/icons/plus.svg";
import close from "../assets/icons/other/028-cancel-1.svg";
import pencil from "../assets/icons/other/edit.svg";
import canvas from "../assets/icons/other2/113-canvas.svg";
import fontUp from "../assets/icons/other/FontUp.png";
import fontDown from "../assets/icons/other/FontDown.png";
import trash from "../assets/icons/other/trash.svg";

// Axios URLS
const GET_USER_URL = "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUser.php";
const GET_TEMPLATE_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUserTemplate.php";
const SAVE_TEMPLATE_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/setTemplate.php";
const GET_MEDIA_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/getUserMedia.php";

var dateFormat = require("dateformat");

export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    var currentUser = auth.getCookie("user");
    //var dateFormat = require('dateformat');

    const urlHash = window.location.hash; // gets the entire URL after the hash (eg. editor?......URL params that were sent...)
    const queryString = urlHash.substring(urlHash.indexOf("?")); // extracts URL params being sent after the hash
    const urlParams = new URLSearchParams(queryString);
    const template_id = urlParams.get("template_id"); // obtains the sent template_id param

    this.state = {
      email: currentUser, // the currently signed in user
      template_id: template_id,
      tabOpen: false,
      activeTab: null,
      gridElements: [],
      layout: [],
      activeElement: null,
      editStyle: null,
      saving: true,
      userContent: []
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
    this.applyStyle = this.applyStyle.bind(this);
    this.resizePropArray = this.resizePropArray.bind(this);
    this.applyChange = this.applyChange.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this.deleteActiveElement = this.deleteActiveElement.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getTemplate = this.getTemplate.bind(this);
    this.selectNewElement = this.selectNewElement.bind(this);
    this.getMedia = this.getMedia.bind(this);
    this.slideWidth = "300px";
  }
  
  selectNewElement(){
    this.elementClicked(this.state.gridElements.length);
    this.tabHandler('component');
  }
  

  componentDidMount() {
    this.getUser();
    this.getTemplate();
    this.getMedia();
  }

  /**
   * Obtains the user details from the database
   */
  getUser() {
    const params = {
      email: this.state.email
    };

    axios
      .post(GET_USER_URL, qs.stringify(params))
      .then(response => {
        console.log(response.data);

        if (response.data["success"] === true) {
          this.setState({
            first_name: response.data.user.first_name
          });
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   *
   */
  getTemplate() {
    const params = {
      template_id: this.state.template_id
    };

    axios
      .post(GET_TEMPLATE_URL, qs.stringify(params))
      .then(response => {
        console.log(response.data);

        //console.log(response.data.template[0].template_data);
        localStorage.setItem(
          "test-editor-store",
          response.data.template[0].template_data
        );

        this.loadGrid();

        // TODO: load the template into the editor here
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMedia() {
    const params = {
      email: this.state.email
    };

    axios
      .post(GET_MEDIA_URL, qs.stringify(params))
      .then(response => {
        console.log(response);

        if (response.data["success"] === true) {
          this.setState({
            userContent: response.data["content"]
          });
        } else {
          console.log(response.data["message"]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // EVENT HANDLERS
  elementClicked(index) {
    // check if the element is already selected, in this case skip everything
    if (this.state.activeElement === index) return;
    // Otherwise continue with changing all the various active elements to reflect the selected component
    const style = this.state.gridElements[index].style;
    let editFields = {};
    for (let [key, value] of Object.entries(
      this.state.gridElements[index].props
    )) {
      if (key !== "key" && key !== "data-grid") {
        editFields[key] = value.value;
      }
    }
    this.setState({
      activeElement: index,
      editElement: editFields,
      editStyle: style
    });
    this.tabHandler('component');
  }

  deleteActiveElement(){
    const index = this.state.activeElement;

    let gridElements = JSON.parse(JSON.stringify(this.state.gridElements));
    gridElements.splice(index, 1);
    let layout = JSON.parse(JSON.stringify(this.state.layout));
    layout.splice(index, 1);
    this.setState({gridElements: gridElements, layout: layout, activeElement: null, activeTab: "layout"});
  }

  handleChange(e, index = undefined) {
    const name = e.target.name;
    const value = e.target.value;
    if (index === undefined) {
      this.setState(prevState => ({
        editElement: { ...prevState.editElement, [name]: value }
      }));
    } else {
      let editCopy = JSON.parse(JSON.stringify(this.state.editElement));
      let temp = editCopy[name];
      for (let i = 0; i < index.length - 1; i++) {
        temp = temp[index[i]];
      }
      temp[index[index.length - 1]] = value;
      // editCopy[name][index] = value;
      this.setState({ editElement: editCopy });
    }
  }

  tabHandler(name) {
    if (this.state.tabOpen) {
      // if the tabs are open, check if clicking same tab then close, otherwise open clicked tab
      if (this.state.activeTab === name) {
        //Do nothing
      } else {
        this.setState({ activeTab: name });
      }
    } else {
      //if tabs are closed open tabs and set to clicked
      this.setState({ tabOpen: true, activeTab: name });
    }
  }

  // UTILITY METHODS

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
      for (let i = 0; i < index.length - 1; i++) {
        temp = temp[index[i]];
      }
      temp[index[index.length - 1]] = newArray;
      // editCopy[name][index] = newArray;
    }
    this.setState({ editElement: editCopy });
  }

  recursiveAccess(obj, route) {
    let temp = obj;
    for (let i = 0; i < route.length; i++) {
      temp = temp[route[i]];
    }
    return temp;
  }

  // DIRECT FUNCTIONALITY METHODS
  applyChange() {
    let elements = JSON.parse(JSON.stringify(this.state.gridElements));
    for (let [keyOld, valueOld] of Object.entries(
      elements[this.state.activeElement].props
    )) {
      if (keyOld !== "key" && keyOld !== "data-grid") {
        for (let [keyNew, valueNew] of Object.entries(this.state.editElement)) {
          if (keyOld === keyNew) {
            elements[this.state.activeElement].props[keyOld].value = valueNew;
          }
        }
      }
    }
    this.setState({ gridElements: elements }, this.saveGrid);
  }

  applyStyle() {
    let elements = JSON.parse(JSON.stringify(this.state.gridElements));
    elements[this.state.activeElement].style = this.state.editStyle;
    this.setState({ gridElements: elements }, this.saveGrid);
  }

  /**
   *
   */
  saveGrid(notify = false) {
    this.setState({saving: true});
    const store = {
      gridElements: this.state.gridElements,
      layout: this.state.layout
    };

    const currentTime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

    const params = {
      template_id: this.state.template_id,
      template_data: JSON.stringify(store),
      last_modified: currentTime
    };

    axios
      .post(SAVE_TEMPLATE_URL, qs.stringify(params))
      .then(response => {
        this.setState({saving: false});

        if (response.data["success"] === true) {
          // template saved successfully
          localStorage.setItem("test-editor-store", JSON.stringify(store));
          if(notify){
            alert(response.data["message"]);
            window.location.reload();
          }
        } else {
          // error occurred during save
          alert(response.data["message"]);
        }

        // TODO: load the template into the editor here
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   *
   */
  loadGrid() {
    const load = JSON.parse(localStorage.getItem("test-editor-store"));
    console.log(load);
    this.setState({
      layout: load.layout,
      gridElements: load.gridElements,
      activeElement: null,
      saving: false
    });
    console.log("Layout loaded");
  }

  // ITEM GENERATION
  generateItem(typeName) {
    // let item = {type: "Textbox", props: {content: {value: "hello world "}, key: this.state.gridElements.length + 1}};
    const typeRef = LEGEND[typeName];
    let key;
    do {
      key =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
    } while (
      this.state.gridElements.length !== 0 &&
      this.state.gridElements.filter(e => e.props.key === key).length > 0
    );

    // it is important that props be added last, when parsing props the form generator will ignore the first two props (key and data-grid)
    const height = this.state.layout.reduce((total, value) => {
      if (value.y + value.h > total) return value.y + value.h;
      return total;
    }, 0);
    let item = {
      type: typeName,
      props: {
        key: key,
        "data-grid": { x: 0, y: height, ...typeRef.gridOptions },
        ...typeRef.props
      },
      style: { fontSize: "1em", color: "#000", backgroundColor: "#FFFFFF00" }
    };
    this.setState(prevState => ({
      gridElements: [...prevState.gridElements, item]
    }),function(){ //elementClicked is a callback function because setState actually batches the update; trying to call the function directly will result in error
      this.elementClicked(this.state.gridElements.length-1);
    });
  }

  // DOM GENERATION FROM DATA
  generateDOM() {
    return this.state.gridElements.map((element, index) => {
      return React.createElement(LEGEND[element.type].type, {
        ...element.props,
        className:
          this.state.activeElement === index && "react-grid-item-active",
        style:
          this.state.activeElement === index
            ? this.state.editStyle
            : element.style,
        // "data-grid": {x:0, y:0, w:4, h:3, ...LEGEND[element.type].gridOptions},        
        onClick: () => this.elementClicked(index)
      });
    });
  }

  formGeneration(schema, key, index = undefined) {
    const inputType = {
      StringArea: "textarea",
      String: "input",
      Int: "input",
      Number: "input"
      // Boolean: "TODO",
      // Select: TODO,
    };

    if (["StringArea", "String", "Int", "Number"].includes(schema.type)) {
      return (
        <Form.Group key={key + index}>
          {index === undefined && <Form.Label>{schema.name}</Form.Label>}
          <Form.Control
            name={key}
            value={
              index === undefined
                ? this.state.editElement[key]
                : this.recursiveAccess(this.state.editElement[key], index)
            }
            onChange={
              index === undefined
                ? this.handleChange
                : e => this.handleChange(e, index)
            }
            as={inputType[schema.type]}
            type={
              schema.type === "Int" || schema.type === "Number"
                ? "number"
                : undefined
            }
            step={schema.type === "Int" ? "1" : "any"}
            min={0}
          />
        </Form.Group>
      );
    } else if (schema.type === "RichText") {
      return (
        <Form.Group>
          {index === undefined && <Form.Label>{schema.name}</Form.Label>}
          <RichTextEditor
            content={
              index === undefined
                ? this.state.editElement[key]
                : this.state.editElement[key][index]
            }
            updateState={e =>
              this.setState(prevState => ({
                editElement: {
                  ...prevState.editElement,
                  [key]: e
                }
              }))
            }
          />
        </Form.Group>
      );
    } else if (schema.type === "Array") {
      return (
        <Form.Group>
          <h2>{schema.name}</h2>
          <p>size</p>
          <Form.Control
            name={key}
            value={
              index === undefined
                ? this.state.editElement[key].length
                : this.state.editElement[key][index].length
            }
            onChange={e => this.resizePropArray(e, schema, index)}
            type={"Number"}
            step={"1"}
            min={schema.min}
            max={schema.max}
            size={"sm"}
            style={{ marginBottom: "5px" }}
          />
          {index === undefined
            ? this.state.editElement[key].map((item, i) => {
                return this.formGeneration(schema.schema, key, [i]);
              })
            : this.recursiveAccess(this.state.editElement[key], index).map(
                (item, i) => {
                  return this.formGeneration(schema.schema, key, [...index, i]);
                }
              )}
          {/*{this.formGeneration(schema.schema, key, 0)}*/}
        </Form.Group>
      );
  	}else if(schema.type === "Image"){
      return(
        <Form.Group key={Math.random()}>
          <Form.Label>{schema.name}</Form.Label>
          <Form.Control
            as={"select"}
            name={key}
            value={
              index === undefined
                ? this.state.editElement[key]
                : this.recursiveAccess(this.state.editElement[key], index)
            }
            onChange={
              index === undefined
                ? this.handleChange
                : e => this.handleChange(e, index)
            }
          >
            <option value={""}>Select an Image</option>
            {this.state.userContent.map(content => {
              return(
                <option value={content.file_location}>
                  {content.file_name}
                  {/*<img src={content.file_location} style={{width: "150px"}}/>*/}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
      )
    }
  }

  // DIRECT RENDER FUNCTIONS
  layoutEditor() {
    //Depending on how many components there are, there will be an empty div so that save/load layout buttons are always on the bottom row together
    if(Object.entries(LEGEND).length%2===1){
      var emptyColumn= (<div className='col-sm-6'></div>);
    }
    else{
      var emptyColumn = "";
    }
    return (
      <div>
        <img
          src={close}
          className={"editor-close-button"}
          onClick={() =>
            this.setState({ tabOpen: false })
          }
        />
        <h1>Components</h1>
        <Container className="editor-sidebar-grid">
          <div className="row">
            {Object.entries(LEGEND).map(([key, value]) => {
              return (
                <div key={"layout-editor-element-" + key} className="col-sm-6">
                  <Card
                    bg="light"
                    style={{
                      height: "120px",
                      width: "120px",
                      cursor: "pointer"
                    }}
                    className="text-center"
                    align="center"
                    tag="a"
                    title={value.desc}
                    onClick={() => this.generateItem(key)}
                  >
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        src={value.iconPathName}
                        className="card-images"
                      />
                      <Card.Text>{value.title}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
            {
              (emptyColumn)
            }
            <div className="col-sm-6"> 
              <Card
                  bg="light"
                  style={{
                    height: "25px",
                    width: "120px",
                    cursor: "pointer"
                  }}
                  className="text-center"
                  align="center"
                  tag="a"
                  title="Save current layout"
                  onClick={this.saveGrid}
              >
                SAVE LAYOUT
              </Card> 
            </div>
            <div className="col-sm-6">   
              <Card 
                  bg="light"
                  style={{
                    height: "25px",
                    width: "120px",
                    cursor: "pointer",
                  }}
                  className="text-center"
                  align="center"
                  tag="a"
                  title="Load to last saved layout"
                  onClick={this.loadGrid}
              >
                LOAD LAYOUT
              </Card>        
            </div>
          </div>
        </Container>
      </div>
    );
  }

  componentEditor() {
    const ELEMENT = this.state.gridElements[this.state.activeElement];
    return (
      <div>
        <img
          src={trash}
          className={"editor-delete-button"}
          onClick={this.deleteActiveElement}
          />
      	<img
          src={close}
          className={"editor-close-button"}
          onClick={() =>
            this.setState({ tabOpen: false })
          }
        />
        <h2
          style={{
            fontStyle: "italic",
            textAlign: "center",
            marginRight: "55px"
          }}
        >
          Edit the contents of your component
        </h2>
        <Form
          onSubmit={e => {
            e.preventDefault();
            this.applyChange();
          }}
          className={"layout-editor-form-root"}
        >
          {Object.keys(ELEMENT.props).map((key, index) => {
            if (index > 1) {
              //check types and return form fields based on types
              //TEXTAREA, TEXT, INT, NUMBER
              return this.formGeneration(ELEMENT.props[key], key);
            }
          })}
          <Button variant={"outline-light"} type={"submit"}>
            APPLY
          </Button>
        </Form>
      </div>
    );
  }

  styleEditor() {
    return (
      <div>
      <img
          src={trash}
          className={"editor-delete-button"}
          onClick={this.deleteActiveElement}
          />
      <img
          src={close}
          className={"editor-close-button"}
          onClick={() =>
            this.setState({ tabOpen: false })
          }
        />
        <h2 style={{ fontStyle: "italic", textAlign: "center", marginRight: "55px" }}>
          Customize the look of your component
        </h2>
        <h2>Font Size</h2>
        <img
          src={fontUp}
          className={"editor-style-font-icon"}
          onClick={() => {
            let size = parseFloat(this.state.editStyle.fontSize);
            size += 0.1;
            this.setState(prevState => ({
              editStyle: { ...prevState.editStyle, fontSize: size + "em" }
            }));
          }}
        />
        <img
          src={fontDown}
          className={"editor-style-font-icon"}
          onClick={() => {
            let size = parseFloat(this.state.editStyle.fontSize);
            size = Math.max(0.1, size - 0.1);
            this.setState(prevState => ({
              editStyle: { ...prevState.editStyle, fontSize: size + "em" }
            }));
          }}
        />
        <span
          className={"editor-style-font-icon"}
          style={{ padding: "0 5px" }}
          onClick={() =>
            this.setState(prevState => ({
              editStyle: { ...prevState.editStyle, fontSize: "1em" }
            }))
          }
        >
          RESET{" "}
        </span>
        <h2>Font Color</h2>
        <ChromePicker
          color={this.state.editStyle.color}
          onChange={c =>
            this.setState(prevState => ({
              editStyle: { ...prevState.editStyle, color: c.hex }
            }))
          }
        />
        <h2>Background Color</h2>
        <ChromePicker
          color={this.state.editStyle.backgroundColor}
          onChange={c =>
            this.setState(prevState => ({
              editStyle: { ...prevState.editStyle, backgroundColor: c.hex }
            }))
          }
        />
        <Button
          variant={"outline-dark"}
          style={{ marginTop: "15px" }}
          onClick={this.applyStyle}
        >
          APPLY
        </Button>
        <h2>Sample output</h2>
        <p style={this.state.editStyle}>Sample Text</p>
      </div>
    );
  }


  render() {
    return (
      <div
        className={"editor-container"}
        style={{ marginRight: this.state.tabOpen ? "300px" : 0 }}
      >
        {this.state.saving && <Spinner animation={"border"} style={{position: "absolute", right: "5px", opacity: 0.5}} />}
        <GridLayout
          className="editor-grid"
          layout={this.state.layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={l => this.setState({ layout: l }, this.saveGrid)}
          compactType={null}
          preventCollision={true}
          margin={[1, 1]}
          // isDraggable={false}
          // isResizable={false}
        >
          {this.generateDOM()}
        </GridLayout>
        <div
          className={"editor-handles-container"}
          style={{ right: this.state.tabOpen ? this.slideWidth : undefined }}
        >
          <div className={"editor-handle editor-handle-layout"}>
            <img
              src={plus}
              onClick={() => this.tabHandler("layout")}
            />
          </div>
          {this.state.activeElement !== null && (
            <div className={"editor-handle editor-handle-component"}>
              <img src={pencil} onClick={() => this.tabHandler("component")} />
            </div>
          )}
          {this.state.activeElement !== null && (
            <div className={"editor-handle editor-handle-style"}>
              <img src={canvas} onClick={() => this.tabHandler("style")} />
            </div>
          )}
        </div>

        <div
          className={[
            "editor-sidebar",
            this.state.activeTab === "layout" && "editor-sidebar-layout",
            this.state.activeTab === "component" && "editor-sidebar-component",
            this.state.activeTab === "style" && "editor-sidebar-style"
          ].join(" ")}
          style={{
            left: this.state.tabOpen ? "calc(100% - 300px)" : "100%",
            boxShadow: this.state.tabOpen
              ? "0 0 20px rgba(54, 58, 64, 0.55)"
              : "none"
          }}
        >
          {this.state.activeTab === "layout" && this.layoutEditor()}
          {this.state.activeTab === "component" && this.componentEditor()}
          {this.state.activeTab === "style" && this.styleEditor()}
        </div>
      </div>
    );
  }
}
