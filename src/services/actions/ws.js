import { WS_CONNECT, WS_DISCONNECT} from "../constaints/websocket";

export const connect = (url) => ({
  type: WS_CONNECT,
  payload: url
});

export const disconnect = () => ({
  type: WS_DISCONNECT,
});