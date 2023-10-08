import { Middleware } from "redux";
import { RootState } from "../types";
import { APP_WS_CONNECT, APP_WS_DISCONNECT, WEBSOCKET_SEND_MESSAGE } from "../constaints/websocket";
import {
  appWebsocketConnectAction,
  websocketCloseAction,
  websocketConnectingAction,
  websocketFailedAction,
  websocketMessageAction,
  websocketOpenAction
} from "../actions/websocket";


export const socketMiddleware = (): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return next => action => {
      const { dispatch } = store;

      if (action.type === APP_WS_CONNECT) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(websocketConnectingAction());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(websocketOpenAction());
        };

        socket.onerror = err  => {
          dispatch(websocketFailedAction(err))
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(websocketMessageAction(parsedData));
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch(websocketFailedAction(event.code.toString()));
          }
          dispatch(websocketCloseAction());

          if (isConnected) {
            dispatch(websocketConnectingAction());
            reconnectTimer = window.setTimeout(() => {
              dispatch(appWebsocketConnectAction(url));
            }, 3000)
          }

        };

        if (action.type === WEBSOCKET_SEND_MESSAGE) {
          socket.send(JSON.stringify(action.payload));
        }

        if (action.type === APP_WS_DISCONNECT) {
          clearTimeout(reconnectTimer)
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(websocketCloseAction());
        }
      }

      next(action);
    };
  };
};

