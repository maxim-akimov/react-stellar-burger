import {
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR,
  WS_MESSAGE
} from "../actions/ws";

import { WebsocketStatus } from '../../utils/constaints';

//import {liveTableUpdate} from "./live-table-update";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  table: [],
  connectingError: ''
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type)
  {
    case WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    case WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      };
    case WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case WS_ERROR:
      return {
        ...state,
        connectingError: action.payload
      };
    case WS_MESSAGE:
      return {
        ...state,
        // table: ordersUpdate(state.table, action.payload),
        ordersData: action.payload,
      }
    default:
      return state;
  }
}