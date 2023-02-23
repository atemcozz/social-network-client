import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/index.css";
import StoreProvider from "./providers/StoreProvider";

//import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
//serviceWorkerRegistration.register();
