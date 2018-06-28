import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducer.js";

import 'todomvc-app-css/index.css'

export const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

