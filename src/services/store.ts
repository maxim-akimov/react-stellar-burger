import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    thunk,
    socketMiddleware()
  ),
  devTools: process.env.NODE_ENV !== 'production',
})