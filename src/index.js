import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Store from "./store/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const store = new Store();
export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ store }}>
    <Router>
      <App />
    </Router>
  </Context.Provider>
);
//serviceWorkerRegistration.register();
