import React from "react";
import ReactDOM from "react-dom";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import rootReducer from "./reducers";
import routes from "./routes";
import Navbar from "./components/NavBar";
import FlashMessagesList from "./components/flash/FlashMessagesList";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes}>
      <Navbar />
      <FlashMessagesList />
      {routes}
    </Router>
  </Provider>,
  document.getElementById("root")
);
