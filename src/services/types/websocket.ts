import {
  APP_WS_CONNECT, APP_WS_DISCONNECT,
  WEBSOCKET_CLOSE,
  WEBSOCKET_CONNECTING,
  WEBSOCKET_ERROR,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN, WEBSOCKET_SEND_MESSAGE
} from "../constaints/websocket";


export interface IAppWebsocketConnectAction {
  readonly type: typeof APP_WS_CONNECT,
  readonly payload: string
}


export interface IAppWebsocketDisconnectAction {
  readonly type: typeof APP_WS_DISCONNECT
}


export interface IWebsocketConnectingAction {
  readonly type: typeof WEBSOCKET_CONNECTING
}


export interface IWebsocketOpenAction {
  readonly type: typeof WEBSOCKET_OPEN
}


export interface IWebsocketCloseAction {
  readonly type: typeof WEBSOCKET_CLOSE
}


export interface IWebsocketFailedAction {
  readonly type: typeof WEBSOCKET_ERROR,
  readonly payload: string
}


export interface IWebsocketMessageAction {
  readonly type: typeof WEBSOCKET_MESSAGE,
  readonly payload: any
}


export interface IWebsocketSendMessageAction {
  readonly type: typeof WEBSOCKET_SEND_MESSAGE,
  readonly payload: any
}


export type TWebsocketActions = IWebsocketConnectingAction
  | IWebsocketOpenAction
  | IWebsocketCloseAction
  | IWebsocketFailedAction
  | IWebsocketMessageAction;
