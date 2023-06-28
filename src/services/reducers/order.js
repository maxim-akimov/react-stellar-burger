export const SET_ORDER = 'SET_ORDER';

const initialState = null;

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      console.log(action.orderData)
      return action.orderData
    }

    default: {
      return state;
    }
  }
}