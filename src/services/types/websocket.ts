import { WS_CONNECT, WS_CONNECTING, WS_DISCONNECT } from "../constaints/websocket";


export interface IWebsocketConnectAction {
  readonly type: typeof WS_CONNECT,
  readonly payload: string
}


export interface IWebsocketConnectingAction {
  readonly type: typeof WS_CONNECTING
}


export interface IWebsocketDisconnectAction {
  readonly type: typeof WS_DISCONNECT
}


export type TWebsocketActions = IWebsocketConnectAction
  | IWebsocketConnectingAction
  | IWebsocketDisconnectAction;
