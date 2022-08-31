import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mapboxgl from "mapbox-gl";
import Helpers from "./Viewer-helpers";
import { urn } from "../../constants/dummyData";
import InfoModal from "../modals/InfoModal";
import { Box } from "@material-ui/core";
import Logo from "../../images/EverseBlackLogo.png";
import InfoImg from "../../images/infoIcon.png";

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
  },
  logo: {
    position: 'absolute',
    width: '8rem',
    zIndex: 9,
    bottom: '0.5rem',
    right: '1rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  info: {
    position: 'absolute',
    width: '1.5rem',
    zIndex: 9,
    top: '1rem',
    left: '1rem',
    cursor: 'pointer'
  }
}));

export default function Viewer() {
  const classes = useStyles();
  useEffect(() => {
    Helpers.launchViewer("viewerDiv", urn, "0002");
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleInfoModal  = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Box mt={3} className={classes.viewerContainer}>
      <img className={classes.info} src={InfoImg} alt="info" onClick={handleInfoModal} />
      <div className={classes.viewer} id="viewerDiv" />
      <a href="https://www.e-verse.com" target={"_blank"}>
        <img className={classes.logo} src={Logo} alt="logo" />
      </a>
      <InfoModal open={isOpen} handleClose={handleInfoModal} />
    </Box>
  );
}