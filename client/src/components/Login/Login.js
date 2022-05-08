import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signIn } from "../../actions/accountActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    textAlign: "center",
    marginTop: ".5rem",
  },
}));

export default function LogIn() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { validationsMessage } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const history = useHistory();

  // useEffect(() => {
  //   dispatch(signOut());
  // }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn(username, password, history));
  };

  return (
    <div className="auth-only-wrapper">
      <Container
        component="main"
        maxWidth="xs"
        className="auth-container"
      >
        <CssBaseline />
        <div className="auth-wrapper">
          <Avatar
            className={classes.avatar}
            style={{
              marginTop: "25px",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Typography
              className={classes.errorMessage}
              variant="subtitle2"
              color="error"
            >
              {validationsMessage}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{
                backgroundColor: "#2b455f",
              }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
