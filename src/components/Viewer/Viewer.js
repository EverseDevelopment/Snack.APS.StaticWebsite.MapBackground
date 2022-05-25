import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";
import Helpers from "./Viewer-helpers";
import { urn } from "../../constants/dummyData";
import { Box } from "@material-ui/core";

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
      height: 'calc(100vh) !important'
    }
  }

}));

export default function Viewer() {
  const classes = useStyles();


  useEffect(() => {
    Helpers.launchViewer("viewerDiv", urn, "0002");
  }, []);
  


  return (
    <Box mt={3} className={classes.viewerContainer}>
      <div className={classes.viewer} id="viewerDiv" />
    </Box>
  );
}