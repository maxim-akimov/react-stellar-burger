import {
  WS_CLOSE,
  WS_CONNECT,
  WS_CONNECTING,
  WS_DISCONNECT,
  WS_ERROR,
  WS_MESSAGE,
  WS_OPEN,
  WS_SEND_MESSAGE
} from "../constaints/websocket";
import {
  IAppWebsocketConnectAction, IAppWebsocketDisconnectAction,
  IWebsocketCloseAction,
  IWebsocketConnectAction,
  IWebsocketConnectingAction,
  IWebsocketDisconnectAction,
  IWebsocketFailedAction,
  IWebsocketMessageAction,
  IWebsocketOpenAction,
  IWebsocketSendMessageAction
} from "../types/websocket";

export const appWebsocketConnectAction = (url: string): IAppWebsocketConnectAction => ({
  type: WS_CONNECT,
  payload: url
});


export const appWebsocketDisconnectAction = (): IAppWebsocketDisconnectAction => ({
  type: WS_DISCONNECT
});


export const websocketConnectingAction = (): IWebsocketConnectingAction => ({
  type: WS_CONNECTING
});


export const websocketOpenAction = (): IWebsocketOpenAction => ({
  type: WS_OPEN
});


export const websocketCloseAction = (): IWebsocketCloseAction => ({
  type: WS_CLOSE,
});


export const websocketFailedAction = (value: string): IWebsocketFailedAction => ({
  type: WS_ERROR,
  payload: value
});


export const websocketMessageAction = (data: any): IWebsocketMessageAction => ({
  type: WS_MESSAGE,
  payload: data
});


export const websocketSendMessageAction = (data: any): IWebsocketSendMessageAction => ({
  type: WS_SEND_MESSAGE,
  payload: data
});