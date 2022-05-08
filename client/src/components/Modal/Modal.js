import React, { useRef, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import PublishIcon from "@material-ui/icons/Publish";
import { Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: "25rem",
  },
  title: {
    textAlign: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  content: {
    padding: "2rem 3rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  buttonContainer: {
    padding: "1rem",
  },
  icon: {
    fontSize: "2rem",
  },
  button: {
    boxShadow: "10px 10px 20px #dbdbdb, -10px -10px 20px #ffffff",
  },
  inputText: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "1rem",
  },
}));

export default function Modal({
  open,
  setOpen,
  modalTitle,
  handleAcceptAction,
  uploading,
  status
}) {
  const classes = useStyles();
  const inputFile = useRef(null);

  const [file, setFile] = useState(null);

  useEffect(() => {
    setFile(null)
  }, [open])

  useEffect(() => {
    if(status === 1) {
      setOpen(false);
      setFile(null); 
    }
  }, [status])

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    handleAcceptAction(file);
  };

  const handleChangeFile = async (event) => {
    setFile(event.target.files[0]);
  };

  const handleOpenModal = () => {
    inputFile.current.click();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        className={classes.container}
      >
        <DialogTitle className={classes.title}>{modalTitle}</DialogTitle>
        <DialogContent className={classes.content}>
          <div>
            <input
              onChange={handleChangeFile}
              ref={inputFile}
              id="file"
              type="file"
              style={{ display: "none" }}
            />
            <div style={{ textAlign: "center", display: "inline-flex" }}>
              <IconButton className={classes.button} onClick={handleOpenModal}>
                <PublishIcon
                  className={classes.icon}
                  color="primary"
                ></PublishIcon>
              </IconButton>
              <div className={classes.inputText}>
                {file && <Typography>{file.name}</Typography>}
                {!file && <Typography>Select a model file</Typography>}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            color={uploading ? "white" : "primary"}
            variant="contained"
            autoFocus
            disabled={uploading}
          >
            {uploading ?  <CircularProgress color="secondary"/> : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
