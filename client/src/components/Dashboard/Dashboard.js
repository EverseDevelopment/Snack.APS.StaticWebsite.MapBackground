/* eslint-disable */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getToken } from "../../actions/viewerActions";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Box } from "@material-ui/core";

import Model from "../Model/Model";
import { getModelList } from "../../actions/modelsActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    marginLeft: "5rem",
    marginRight: "5rem",
    ['@media (max-width:600px)']: {
      marginRight: '1rem',
      marginLeft: '1rem'
    },
    ['@media (max-width:960px)']: {
      marginRight: '3rem',
      marginLeft: '3rem'
    }
  },
  noContentText: {
    color: theme.palette.text.disabled,
    fontWeight: "bold",
    height: '20rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.1rem'
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: "-20px"
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { viewerAuth } = useSelector((state) => state.viewer);
  const { modelList } = useSelector((state) => state.models);

  const dispatch = useDispatch();

  const [snackBarOpen, setSnackBarOpen] = React.useState(true);

  useEffect(() => {
    if (!viewerAuth) {
      dispatch(getToken());
    }
  }, [viewerAuth]);

  useEffect(() => {
    if (!modelList) {
      dispatch(getModelList());
    }
  }, [modelList]);

  useEffect(() => {
    if(props.deletingStatus === 1) {
        setSnackBarOpen(true);
    }
  }, [props.deletingStatus])

  if (!viewerAuth) {
    return null;
  }

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <Fragment>
      {props.isModelList !== 0 ? (
      <Box mt={3} className={classes.dashboardContainer}>
        <Grid container spacing={3} className={classes.gridViewerContainer}>
          {modelList && modelList.map((model, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} >
              <Model model={model} index={index} deleting={props.deleting} delIndex={props.deletingIndex} />
            </Grid>
          ))}
          {
            modelList && modelList.length < 1 && (
              <Grid item xs={12}>
                <div className={classes.noContentText}>
                  No models uploaded
                </div>
              </Grid>
            )
          }
        </Grid>
        {props.deletingStatus === 1 && (
            <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}>
              <Alert variant="filled" severity="success">
                Model has been deleted successfully!
              </Alert>
            </Snackbar>
          )}
      </Box>
      ) : (
      <div className="spinner-div">
        <CircularProgress color="secondary" className={classes.spinner} />
      </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = state => {
  const { deleting, deletingStatus, deletingIndex, isModelList } = state.models;
  return { deleting, deletingStatus, deletingIndex, isModelList };
}

export default withRouter(connect(mapStateToProps, {})(Dashboard));
