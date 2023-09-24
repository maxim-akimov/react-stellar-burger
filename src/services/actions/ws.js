import {WS_URL} from "../../utils/api";

export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CONNECTING = 'WS_CONNECTING';
export const WS_OPEN = 'WS_OPEN';
export const WS_CLOSE = 'WS_CLOSE';
export const WS_ERROR = 'WS_ERROR';
export const WS_MESSAGE = 'WS_MESSAGE';

export const connect = (url) => ({
  type: WS_CONNECT,
  payload: url
});

export const disconnect = () => ({
  type: WS_DISCONNECT,
});