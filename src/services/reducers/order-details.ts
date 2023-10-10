import { IOrder } from "../../types/data";
import { IRequestState } from "../types";
import {
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS, RESET_ORDER_DETAILS
} from "../constaints/order-details";
import { TOrderDetailsActions } from "../types/order-details";


interface IOrderDetailsState {
  data: IOrder | null,
  requestState: IRequestState
}

const initialState: IOrderDetailsState = {
  data: null,
  requestState: {
    request: false,
    success: false,
    failed: false,
    errorMessage: ''
  }
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: true,
        }
      };
    }

    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        requestState: {
          ...state.requestState,
          request: false,
          success: true,
        }
      };
    }

    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          failed: true,
          errorMessage: action.payload,
        }
      };
    }

    case RESET_ORDER_DETAILS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}