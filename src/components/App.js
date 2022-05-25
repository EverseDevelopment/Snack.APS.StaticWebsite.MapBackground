import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Viewer from "./Viewer/Viewer";
import Layout from "../middleware/Layout";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";


function App() {

  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Layout path="/" exact component={Viewer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
