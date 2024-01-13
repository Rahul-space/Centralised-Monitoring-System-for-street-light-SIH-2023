import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { ZoneContextProvider } from "./context/zonecontext";
ReactDOM.render(
    <DarkModeContextProvider>
      <ZoneContextProvider>
        <App />
      </ZoneContextProvider>
    </DarkModeContextProvider>,
  document.getElementById("root")
);
