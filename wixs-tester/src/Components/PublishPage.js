import React, { Component } from "react";
import { Container } from "react-bootstrap";
import GridLayout from "react-grid-layout";
import { LEGEND } from "./Editor/EDITOR_CONSTANTS";

import axios from "axios";
//import auth from "/auth.js";
import qs from "qs"; // for packaging details collected from the form

// CSS/SASS
import "./sass/PublishPage.scss";

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
      gridElements: [],
      layout: [],
      noActive: false,
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

        if (response.data["success"] === true) {
          localStorage.setItem(
            "published-editor-store",
            response.data.template[0].template_data
          );

          this.loadGrid();
        } else {
          // no active templates for the user returned

          this.setState({
            noActive: true, // state updated to reflect no template
          });
        }

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
    let emptyTemplate;

    if (this.state.noActive) {
      emptyTemplate = (
        <div className="empty-temp-text">
          <Container>
            <p>User does not have any active templates.</p>
          </Container>
        </div>
      );
    }

    return (
      <div>
        <div>{emptyTemplate}</div>
        <div className={"publish-container"}>
          <GridLayout
            className="editor-grid"
            layout={this.state.layout}
            cols={12}
            rowHeight={30}
            width={1200}
            compactType={null}
            preventCollision={true}
            margin={[0, 0]}
            isDraggable={false}
            isResizable={false}
          >
            {this.generateDOM()}
          </GridLayout>
        </div>
      </div>
    );
  }
}

export default PublishPage;
