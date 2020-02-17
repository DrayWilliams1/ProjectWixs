import React from "react";
import {
  BrowserRouter as Router,
  HashRouter as HRouter,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

// Components
import HomePage from "./components/HomePage.js";
import AboutPage from "./components/AboutPage.js";
import NullPage from "./components/NullPage.js";

function App() {
  return (
    <div className="App">
      <HRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route path="*" component={NullPage} />
        </Switch>
      </HRouter>
    </div>
  );
}

export default App;
