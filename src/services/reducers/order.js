import {SET_ORDER, SET_ORDER_FAILED, SET_ORDER_REQUEST, SET_ORDER_SUCCESS} from "../actions/order";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderData: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return {
        ...state,
        orderData: action.orderData
      }
    }

    case SET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }

    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.orderData,
      };
    }

    case SET_ORDER_FAILED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}