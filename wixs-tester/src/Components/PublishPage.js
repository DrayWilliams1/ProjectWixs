import React, { Component } from "react";
import GridLayout from "react-grid-layout";
import { LEGEND } from "./Editor/EDITOR_CONSTANTS";

import axios from "axios";
//import auth from "/auth.js";
import qs from "qs"; // for packaging details collected from the form

// Axios URLs
const GET_ACTIVE_TEMP_URL =
  "http://cosc.brocku.ca/~c4f00g02/projectWixs/getActiveTemplate.php";

class PublishPage extends Component {
  constructor(props) {
    super(props);

    const urlHash = window.location.hash; // gets the entire URL after the hash (eg. editor?......URL params that were sent...)
    const queryString = urlHash.substring(urlHash.indexOf("?")); // extracts URL params being sent after the hash
    const urlParams = new URLSearchParams(queryString);
    const owner_email = urlParams.get("user"); // obtains the sent template_id param

    this.state = {
      owner_email,
      owner_email,
      gridElements: [],
      layout: [],
    };

    this.loadGrid = this.loadGrid.bind(this);
    this.getActiveTemplate = this.getActiveTemplate.bind(this);
  }

  loadGrid() {
    const load = JSON.parse(localStorage.getItem("published-editor-store"));
    console.log(load);
    this.setState({
      layout: load.layout,
      gridElements: load.gridElements,
      activeElement: null,
      saving: false,
    });
    console.log("Layout loaded");
  }

  generateDOM() {
    return this.state.gridElements.map((element, index) => {
      return React.createElement(LEGEND[element.type].type, {
        ...element.props,
        style: element.style,
      });
    });
  }

  /**
   * Gets the active template from the database
   */
  getActiveTemplate() {
    const params = {
      owner_email: this.state.owner_email,
    };

    axios
      .post(GET_ACTIVE_TEMP_URL, qs.stringify(params))
      .then((response) => {
        console.log(response.data);

        //console.log(response.data.template[0].template_data);
        localStorage.setItem(
          "published-editor-store",
          response.data.template[0].template_data
        );

        this.loadGrid();

        // TODO: load the template into the editor here
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getActiveTemplate();
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
