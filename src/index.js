import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

export const store = configureStore();

const SettingsContext = createContext();

const theme = createTheme({
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
        <App />
      </MuiThemeProvider>
    </SettingsContext.Provider>
  </Provider>,
  document.getElementById("root")
);
