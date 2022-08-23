import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#E62442"
  },
  description: {
    "& h3": {
      fontSize: "1rem",
      fontWeight: "bold"
    },
    "& p": {
      fontSize: "13px",
      color: "grey",
      marginBottom: "0.5rem"
    }
  }
}));

const infos = [
  {title: "Description", contents: ["This is a 3D viewer to locate a model in a map and display surrounding 3D buildings"]},
  {title: "Technology Stack", contents: ["Forge", "Three.js", "OpenStreet map", "Mapbox", "React"]},
  {title: "Services", contents: ["3D viewer"]}
];

const InfoModal = ({open, handleClose}) => {
  const classes = useStyles();

  const infoContents = () => {
    return infos.map((item, index) => {
      return (
        <div className={classes.description} key={index}>
          <h3>
            {item.title}
          </h3>
          {subItems(item.contents)}
        </div>
      )
    })
  }

  const subItems = (items) => {
    return items.map((item, index) => {
      return (
        <p key={index}>{item}</p>
      )
    })
  }

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle className={classes.title}>
        DATA MODEL
      </DialogTitle>
      <DialogContent>
        {infoContents()}
      </DialogContent>
    </Dialog>
  )
}

export default InfoModal