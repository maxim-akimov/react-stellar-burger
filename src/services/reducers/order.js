import {SET_ORDER} from "../actions/order";

const initialState = null;

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return action.orderData
    }

    default: {
      return state;
    }
  }
}