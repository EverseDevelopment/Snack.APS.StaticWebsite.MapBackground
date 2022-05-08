import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export const store = configureStore();

const SettingsContext = createContext();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2b455f",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <SettingsContext.Provider>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </MuiThemeProvider>
    </SettingsContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
