import {
  APP_WS_CONNECT,
  APP_WS_DISCONNECT,
  WEBSOCKET_CONNECTING,
  WEBSOCKET_ERROR,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSE,
  WEBSOCKET_SEND_MESSAGE
} from "../constaints/websocket";
import {
  IAppWebsocketConnectAction,
  IAppWebsocketDisconnectAction,
  IWebsocketCloseAction,
  IWebsocketConnectingAction,
  IWebsocketFailedAction,
  IWebsocketMessageAction,
  IWebsocketOpenAction,
  IWebsocketSendMessageAction
} from "../types/websocket";
 
export const appWebsocketConnectAction = (url: string): IAppWebsocketConnectAction => ({
  type: APP_WS_CONNECT,
  payload: url
});


export const appWebsocketDisconnectAction = (): IAppWebsocketDisconnectAction => ({
  type: APP_WS_DISCONNECT
});


export const websocketConnectingAction = (): IWebsocketConnectingAction => ({
  type: WEBSOCKET_CONNECTING
});


export const websocketOpenAction = (): IWebsocketOpenAction => ({
  type: WEBSOCKET_OPEN
});


export const websocketCloseAction = (): IWebsocketCloseAction => ({
  type: WEBSOCKET_CLOSE,
});


export const websocketFailedAction = (value: any): IWebsocketFailedAction => ({
  type: WEBSOCKET_ERROR,
  payload: value
});


export const websocketMessageAction = (data: any): IWebsocketMessageAction => ({
  type: WEBSOCKET_MESSAGE,
  payload: data
});


export const websocketSendMessageAction = (data: any): IWebsocketSendMessageAction => ({
  type: WEBSOCKET_SEND_MESSAGE,
  payload: data
});