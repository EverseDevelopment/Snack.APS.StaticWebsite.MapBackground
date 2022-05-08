import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";
import Helpers from "./Viewer-helpers";
import ProviderWrapper from './extensions/provider';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const useStyles = makeStyles((theme) => ({
    viewerContainer: {
    margin: 0,
    height: '88vh',
    width: '100%'
  },
  viewer: {
    '& .adsk-viewing-viewer': {
      height: 'calc(100vh - 118px) !important'
    }
  }

}));

export default function Viewer() {
  const classes = useStyles();

  useEffect(() => {
    Helpers.launchViewer("viewerDiv", "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLjR4eGtOZVVyVFRPbV9KMkhWQTdCRGc_dmVyc2lvbj0x", "0002");
  });


  return (
    <Fragment>
      <div className="row top-header-wrapper">
        <ProviderWrapper status={0} />
      </div>
      <div className={classes.viewer} id="viewerDiv" />
    </Fragment>
  );
}