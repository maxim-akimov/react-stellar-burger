import {
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_REQUEST
} from "../actions/order-details";

const initialState = {
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  orderDetails: null,
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
        orderDetailsFailed: false,
      };
    }

    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetailsRequest: false,
        items: action.items,
      };
    }

    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...initialState,
        orderDetailsRequest: false,
        orderDetailsFailed: true,
      };
    }

    default: {
      return state;
    }
  }
}