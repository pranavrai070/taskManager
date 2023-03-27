import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./reducers/store";
import App from "./App";
import "./index.css";

// React Bootstrap Configuration
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

//fontawsome
import "font-awesome/css/font-awesome.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
