import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import JsonComparerProvider from "./context/Provider";

ReactDOM.render(
  <JsonComparerProvider>
    <App />
  </JsonComparerProvider>,
  document.getElementById("root")
);
