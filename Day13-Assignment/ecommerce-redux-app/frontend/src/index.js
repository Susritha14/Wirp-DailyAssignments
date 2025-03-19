import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

// Get the root DOM element
const container = document.getElementById("root");
// Create a root.
const root = createRoot(container);

// Render the application using the new API.
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
