import { WS_CONNECT, WS_CONNECTING, WS_DISCONNECT } from "../constaints/websocket";
import { IWebsocketConnectAction, IWebsocketConnectingAction, IWebsocketDisconnectAction } from "../types/websocket";

export const websocketConnectAction = (url: string): IWebsocketConnectAction => ({
  type: WS_CONNECT,
  payload: url
});


export const websocketConnectingAction = (): IWebsocketConnectingAction => ({
  type: WS_CONNECTING
});


export const websocketDisconnectAction = (): IWebsocketDisconnectAction => ({
  type: WS_DISCONNECT
});