import React from "react";
import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// Components
import App from "./App";

/**
 * Purpose: This file is an entry point into the ProjectWixs app file, following React conventions requiring a
 * single component to be rendered on entry js.
 */
render(<App />, document.getElementById("root"));
