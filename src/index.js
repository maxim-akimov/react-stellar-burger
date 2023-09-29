import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";


import "./index.css";

import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

import {rootReducer} from './services/reducers';
import {BrowserRouter as Router} from 'react-router-dom';
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR,
  WS_MESSAGE
} from "./services/actions/ws";


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsActions = {
  wsConnect: WS_CONNECT,
  wsDisconnect: WS_DISCONNECT,
  wsConnecting: WS_CONNECTING,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_MESSAGE
};

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));


const store = createStore(rootReducer, enhancer);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
