import {
  APP_WS_CONNECT, APP_WS_DISCONNECT,
  WS_CLOSE,
  WS_CONNECT,
  WS_CONNECTING,
  WS_DISCONNECT,
  WS_ERROR,
  WS_MESSAGE,
  WS_OPEN, WS_SEND_MESSAGE
} from "../constaints/websocket";
import { appWebsocketConnectAction } from "../actions/websocket";


export interface IAppWebsocketConnectAction {
  readonly type: typeof APP_WS_CONNECT,
  readonly payload: string
}


export interface IAppWebsocketDisconnectAction {
  readonly type: typeof APP_WS_DISCONNECT
}


export interface IWebsocketConnectingAction {
  readonly type: typeof WS_CONNECTING
}


export interface IWebsocketOpenAction {
  readonly type: typeof WS_OPEN
}


export interface IWebsocketCloseAction {
  readonly type: typeof WS_CLOSE
}


export interface IWebsocketFailedAction {
  readonly type: typeof WS_ERROR,
  readonly payload: string
}


export interface IWebsocketMessageAction {
  readonly type: typeof WS_MESSAGE,
  readonly payload: any
}


export interface IWebsocketSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE,
  readonly payload: any
}


export type TWebsocketActions = IWebsocketConnectAction
  | IWebsocketConnectingAction
  | IWebsocketDisconnectAction
  | IWebsocketOpenAction
  | IWebsocketCloseAction
  | IWebsocketFailedAction
  | IWebsocketMessageAction;
