import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Viewer from "./Viewer/Viewer";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";



function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    return setToken(localStorage.getItem('accessToken'));
  }, [localStorage.getItem('accessToken')])

  return (
    <div className="wrapper">
      <Router>
            <Switch>
              {/* Unprotected Routes */}
              <Route path='/viewer' component={Viewer} auth={token} />
              {/* Protected Routes */}
            </Switch>
      </Router>
    </div>
  );
}

export default App;
