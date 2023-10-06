

import { WebsocketStatus } from '../../utils/constaints';
import { TWebsocketActions } from "../types/websocket";
import {
  APP_WS_CONNECT, WEBSOCKET_CLOSE,
  WEBSOCKET_CONNECTING, WEBSOCKET_ERROR, WEBSOCKET_MESSAGE, WEBSOCKET_OPEN,
  WS_CLOSE,
  WS_CONNECTING,
  WS_ERROR,
  WS_MESSAGE,
  WS_OPEN
} from "../constaints/websocket";
import { IOrder } from "../../types/data";
import { IWebsocketConnectingState } from "../types";


interface IWebsocketState {
  data: ReadonlyArray<IOrder>,
  status: string,
  connectingState: IWebsocketConnectingState
}

const initialState: IWebsocketState = {
  data: [],
  status: WebsocketStatus.OFFLINE,
  connectingState: {
    open: false,
    close: false,
    error: false,
    errorMessage: ''
  }
};

export const websocketReducer = (state = initialState, action: TWebsocketActions) => {
  switch (action.type)
  {
    case WEBSOCKET_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };

    case WEBSOCKET_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingState: {
          ...state.connectingState,
          open: true,
          close: false,
          error: false,
          errorMessage: '',
        }
      };

    case WEBSOCKET_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        connectingState: {
          ...state.connectingState,
          open: false,
          close: true,
          error: false,
          errorMessage: '',
        }
      };

    case WEBSOCKET_ERROR:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingState: {
          ...state.connectingState,
          open: false,
          error: true,
          errorMessage: action.payload,
        }
      };

    case WEBSOCKET_MESSAGE:
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state;
  }
}