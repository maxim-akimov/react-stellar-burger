import { IOrder } from "../../types/data";
import { IRequestState } from "../types";
import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  SET_CREATED_ORDER
} from "../constaints/create-order";
import { TCreateOrderActions } from "../types/create-order";


interface ICreateOrderState {
  data: IOrder | null,
  requestState: IRequestState
}


const initialState: ICreateOrderState = {
  data: null,
  requestState: {
    request: false,
    success: false,
    failed: false,
    errorMessage: ''
  }
};

export const createOrderReducer = (state = initialState, action: TCreateOrderActions) => {
  switch (action.type) {
    case SET_CREATED_ORDER: {
      return {
        ...state,
        data: action.payload,
      }
    }

    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: true,
        }
      };
    }

    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        requestState: {
          ...state.requestState,
          request: false,
          success: true,
        }
      };
    }

    case CREATE_ORDER_FAILED: {
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

    default: {
      return state;
    }
  }
}