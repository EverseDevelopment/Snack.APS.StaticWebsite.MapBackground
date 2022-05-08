import React, { useRef, useState, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getURN } from '../../services/apiHelper';
import Tooltip from '@material-ui/core/Tooltip';
import {toastr} from 'react-redux-toastr';

const useStyles = makeStyles((theme) => ({
  modelContainer: {
    background: theme.palette.common.white,
    width: "100%",
    height: "10rem",
    alignItems: "center",
    borderRadius: "1rem",
    boxShadow: "10px 10px 20px #dbdbdb, -10px -10px 20px #ffffff",
    "&:hover": {
      background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
      boxShadow: "10px 10px 20px #dbdbdb, -10px -10px 20px #ffffff",
    },
  },
  dotsContainer: {
    color: theme.palette.text.secondary,
    height: "2rem",
  },
  nameContainer: {
    height: `calc(100% - 4rem)`,
    cursor: "pointer",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
  delThreeDots: {
    cursor: "pointer"
  },
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: '#2b455f',
  },
  tooltip: {
    backgroundColor: '#2b455f',
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default function Model({ model, index, deleting, delIndex }) {
  const classes = useStyles();
  const history = useHistory();
  const widthRef = useRef(null);

  const [width, setWidth] = useState(null);

  let movement_timer = null;
  const RESET_TIMEOUT = 100;

  const setDimension = () => {
    if (widthRef.current) {
      setWidth(widthRef.current.offsetWidth);
    }
  };

  useLayoutEffect(() => {
    setDimension();
  }, []);

  window.addEventListener("resize", () => {
    clearInterval(movement_timer);
    movement_timer = setTimeout(setDimension, RESET_TIMEOUT);
  });



  const lauchViewer = (docId) => {
    if(docId === '') {
      getURN(model.DisplayName).then(res => {
        if(res) {
          history.push(`/viewer/${res.ModelURN}`);
        } else {
          stillLoading();
        }
      })
      .catch(err => {
        error();
      })
    } else {
      history.push(`/viewer/${docId}`);
    }
  };

  const stillLoading = () => {
    toastr.error("File is still being uploaded");
  }

  const error = () => {
    toastr.error("Something went wrong. Please try again");
  }






  return (
    <React.Fragment>
    <Box className={classes.modelContainer} ref={widthRef}>
      <Box
        display="flex"
        justifyContent="flex-end"
        mr={3}
        pt={2}
        className={classes.dotsContainer}
      >
      </Box>
      {deleting && index === delIndex ? (
        <Box className="text-center">
        <CircularProgress color="secondary" />
        <Typography>
          Deleting...
        </Typography>
      </Box>
      ) : (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.nameContainer}
        onClick={() => lauchViewer(model.ModelURN)}
      >
        <BootstrapTooltip title={ model.DisplayName } enterDelay={1000} leaveDelay={300} placement="top" arrow>
          <Typography className={classes.nameText} color="primary">
            { width && width - 50 < model.DisplayName.length * 10 ? (model.DisplayName.slice(0, parseInt((width - 50) / 10)) + "...") : model.DisplayName }
          </Typography>
        </BootstrapTooltip>
      </Box>
      )}
    </Box>
    </React.Fragment>
  );
}
