import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from './services/reducers';

import {BrowserRouter as Router} from 'react-router-dom';

import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {websocketActions} from "./utils/constaints";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

import {App} from "./components/app/app";


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        thunk,
        socketMiddleware(websocketActions)
    ),
    devTools: process.env.NODE_ENV !== 'production',
})


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
