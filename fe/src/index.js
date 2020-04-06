import React from "react";
import ReactDOM from "react-dom";

//Stort
import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducer from "./reducers/index";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(myReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
