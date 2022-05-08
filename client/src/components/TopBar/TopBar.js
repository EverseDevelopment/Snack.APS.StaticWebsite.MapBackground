import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { uploadNewModel, setDefault } from "../../actions/modelsActions";
import Modal from "../Modal/Modal";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogOut from '@material-ui/icons/ExitToApp';
import { signOut } from "../../actions/accountActions";
import {toastr} from 'react-redux-toastr';
import Logo from '../../images/logo.png';
import "./style.scss";

import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const useStyles = makeStyles((theme) => ({
  topBarContainer: {
    background: theme.palette.common.white,
    width: "100vw",
    height: "5rem",
    display: "flex",
    alignItems: "center",
    boxShadow: "10px 10px 20px #dbdbdb, -10px -10px 20px #ffffff",
  },
  menuText: {
    textAlign: "right"
  },
  textDisabled: {
    color: theme.palette.text.disabled,
    fontWeight: "bold",
    // color: "#363636",
    fontSize: "1.25rem",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    // fontWeight: "500",
    lineHeight: "1.6",
    letterSpacing: "0.0075em",
    '&:hover': {
      textDecoration: "unset"
    },
  },
  button: {
    fontWeight: "bold",
  },
  avatarContainer: {
    right: "2rem",
    position: "absolute",
    top: ".8rem",
  },
  avatar: {
    boxShadow: "none",
    fontWeight: "bold",
    borderRadius: "50%",
    height: "3.5rem",
    width: "3.5rem !important",
  },
  logoStyle: {
    width: "12rem !important",
  },
}));

const StyledMenu = withStyles({
  paper: {
    boxShadow: '1px 1px 25px #dbdbdb',
    width: '200px'
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const TopBar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(true);

  const [uploadBtnStatus, setUploadBtnStatus] = useState(true);

  useEffect(() => {
    const url = window.location.pathname;
    if(url.includes("/viewer")) {
      setUploadBtnStatus(false);
    } else {
      setUploadBtnStatus(true);
    }
  }, [])

  useEffect(() => {
    if(props.uploadingResult === 1) {
        setSnackBarOpen(true);
    }
  }, [props.uploadingResult])

  


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleUploadFile = async (event) => {
    if (event) {
      if(event.size / 1000000 > 500) {
        setOpenModal(false);
        const msg = "The file cannot be uploaded because it exceeds 500MB";
        errorNotification(msg);
        return false;
      }
      if (props.modelList && props.modelList.some(e => e.DisplayName === event.name)) {
        const msg = "A file with the same name already exists so I cannot be uploaded";
        setOpenModal(false);
        errorNotification(msg);
        return false;
      }
      await dispatch(uploadNewModel(event));
    }
  };

  const errorNotification = (msg) => {
    toastr.error(msg);
  }  

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
    props.setDefault();
  };

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="md" bg="white" className="nav-back-shadow">
        <Navbar.Brand>
          <Box display="flex" flexDirection="row" ml={3}>
            <a href="/dashboard" className="logo-link">
              <img src={Logo} alt="logo" width="150px" />
            </a>
          </Box>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto center-items">
          <Nav.Link className={classes.textDisabled} color="secondary">
            {uploadBtnStatus && (
            <Button
              className={classes.button}
              id="upload-btn"
              variant="contained"
              size="large"
              color="primary"
              onClick={handleOpenModal}
            >
              Upload
            </Button>)}
            </Nav.Link>
          </Nav>
          <Nav>
            {/* <Nav.Link> */}
              <Box
                flexDirection="row-reverse"
                className="avatar-button"
              >
              <Button className={classes.avatar} variant="contained" onClick={handleClick}>
                RW
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemText className="logout-text" primary="Log out" onClick={handleSignOut} />
                  <ListItemIcon>
                    <LogOut fontSize="default" />
                  </ListItemIcon>
                </StyledMenuItem>
               </StyledMenu>
              </Box>
            {/* </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
          open={openModal}
          setOpen={setOpenModal}
          modalTitle={"New Model"}
          status={props.uploadingResult}
          uploading={props.uploading}
          handleAcceptAction={(e) => handleUploadFile(e)}
        />
        {props.uploadingResult === 1 && (
          <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}>
            <Alert variant="filled" severity="success">
              File uploaded successfully!
            </Alert>
          </Snackbar>
        )}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  const { uploading, uploadingResult, modelList } = state.models;
  return { uploading, uploadingResult, modelList };
}

export default withRouter(connect(mapStateToProps, {setDefault})(TopBar));
