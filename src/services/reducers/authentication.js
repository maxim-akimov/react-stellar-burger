import {SET_USER, SET_AUTH_CHECKED} from "../actions/autentication";

const initialState = {
  user: {},
  isAuthChecked: false
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }

    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload
      };
    }

    default: {
      return state;
    }
  }
}